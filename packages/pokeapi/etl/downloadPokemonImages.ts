import fs from 'fs-extra';
import path from 'path';
import https from 'https';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import pokemonData from '../src/data/pokemon.json';

// Parse command line arguments using yargs
const argv = yargs(hideBin(process.argv))
  .options({
    rangeStart: {
      type: 'number',
      description: 'Starting Pokemon ID',
      default: 1
    },
    rangeEnd: {
      type: 'number',
      description: 'Ending Pokemon ID',
      default: 1008 // Default to max Pokemon ID
    }
  })
  .help()
  .alias('help', 'h')
  .parseSync();

// Get command line arguments
const { rangeStart, rangeEnd } = argv;

console.log(`Using range: ${rangeStart} to ${rangeEnd}`);

// Define types locally to avoid module resolution issues
interface PokemonSprites {
  front_default?: string | null;
  back_default?: string | null;
  front_shiny?: string | null;
  back_shiny?: string | null;
  official_artwork?: string | null;
  [key: string]: string | null | undefined;
}

// Using a type assertion to bypass type checking for the actual data
type PokemonData = any;

// Define the directory to save images
const IMAGE_DIR = path.join(__dirname, '../src/images');
const SPRITE_TYPES = [
  'front_default',
  'back_default',
  'front_shiny',
  'back_shiny',
  'official_artwork'
] as const;

// Define sprite type as a union of string literals
type SpriteType = typeof SPRITE_TYPES[number];

// Create the image directory if it doesn't exist
fs.ensureDirSync(IMAGE_DIR);

// Create subdirectories for each sprite type
SPRITE_TYPES.forEach(type => {
  const dir = path.join(IMAGE_DIR, type);
  fs.ensureDirSync(dir);
});

/**
 * Downloads an image from a URL and saves it to the specified path
 */
function downloadImage(url: string, filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Skip if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`File already exists: ${filePath}`);
      resolve();
      return;
    }
    
    https.get(url, (response) => {
      // Handle HTTP errors
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: HTTP ${response.statusCode}`));
        return;
      }
      
      // Create a write stream to save the image
      const fileStream = fs.createWriteStream(filePath);
      
      // Pipe the HTTP response to the file
      response.pipe(fileStream);
      
      // Handle completion
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${filePath}`);
        resolve();
      });
      
      // Handle errors
      fileStream.on('error', (err) => {
        fs.unlink(filePath, () => {}); // Delete the file on error
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Sleep function to add delay between downloads to avoid rate limiting
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Process all Pokémon and download their sprites
 */
async function downloadAllPokemonImages() {
  console.log(`Starting download of Pokémon images...`);
  console.log(`Target directory: ${IMAGE_DIR}`);
  console.log(`Range: ${rangeStart} to ${rangeEnd}`);
  
  // Filter Pokemon by ID range
  const filteredPokemon = (pokemonData as PokemonData[]).filter(
    pokemon => pokemon.id >= rangeStart && pokemon.id <= rangeEnd
  );
  
  // Track progress
  let completed = 0;
  const total = filteredPokemon.length * SPRITE_TYPES.length;
  
  // Process each Pokémon
  for (const pokemon of filteredPokemon) {
    const { id, name, sprites } = pokemon;
    
    // Download each sprite type
    for (const spriteType of SPRITE_TYPES) {
      const url = sprites[spriteType];
      
      // Skip if URL is not available
      if (!url) {
        console.log(`No ${spriteType} sprite for ${name} (${id})`);
        completed++;
        continue;
      }
      
      // Extract file extension from URL
      const fileExt = path.extname(url) || '.png';
      
      // Create the file path
      const fileName = `${id}${fileExt}`;
      const filePath = path.join(IMAGE_DIR, spriteType, fileName);
      
      try {
        await downloadImage(url, filePath);
        // Add a small delay to avoid overwhelming the server
        await sleep(50);
      } catch (error) {
        console.error(`Error downloading ${spriteType} for ${name} (${id}):`, error);
      }
      
      completed++;
      if (completed % 50 === 0 || completed === total) {
        console.log(`Progress: ${completed}/${total} (${Math.round(completed / total * 100)}%)`);
      }
    }
  }
  
  console.log(`Download complete! ${completed}/${total} images processed.`);
}

// Run the download process
downloadAllPokemonImages().catch(error => {
  console.error('Error in download process:', error);
  process.exit(1);
});
