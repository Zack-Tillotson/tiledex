import fs from 'fs-extra';
import path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { PokemonResponse as PokemonRaw, ProcessedPokemon } from './types';

// Parse command line arguments using yargs
const argv = yargs(hideBin(process.argv))
  .options({
    outputDir: {
      type: 'string',
      description: 'Output directory for processed data',
      default: path.join(__dirname, '..', 'src', 'data')
    }
  })
  .help()
  .alias('help', 'h')
  .parseSync();

// Configuration
const INPUT_DIR = path.join(__dirname, 'pokemon');
const OUTPUT_FILE = path.join(argv.outputDir as string, 'pokemon.json');

/**
 * Process a single Pokemon's raw data into a more usable format
 */
function processPokemon(rawData: PokemonRaw): ProcessedPokemon {
  return {
    id: rawData.id,
    name: rawData.name,
    types: rawData.types.map(t => t.type.name),
    sprites: {
      front_default: rawData.sprites.front_default,
      back_default: rawData.sprites.back_default,
      front_shiny: rawData.sprites.front_shiny,
      back_shiny: rawData.sprites.back_shiny,
      official_artwork: rawData.sprites.other['official-artwork'].front_default
    },
    stats: rawData.stats.map(s => ({
      name: s.stat.name,
      base_stat: s.base_stat
    })),
    height: rawData.height,
    weight: rawData.weight,
    abilities: rawData.abilities.map(a => ({
      name: a.ability.name,
      is_hidden: a.is_hidden
    })),
    species: rawData.species.name
  };
}

/**
 * Main function to process all Pokemon data
 */
async function processAllPokemon(): Promise<void> {
  console.log('Starting to process Pokemon data...');
  
  // Ensure the output directory exists
  fs.ensureDirSync(path.dirname(OUTPUT_FILE));
  
  // Get all JSON files in the input directory
  const files = fs.readdirSync(INPUT_DIR)
    .filter(file => file.endsWith('.json'))
    .sort((a, b) => {
      const idA = parseInt(a.split('.')[0] || '0');
      const idB = parseInt(b.split('.')[0] || '0');
      return idA - idB;
    });
  
  console.log(`Found ${files.length} Pokemon files to process`);
  
  // Process each file
  const processedPokemon: ProcessedPokemon[] = [];
  
  for (const file of files) {
    const filePath = path.join(INPUT_DIR, file);
    const rawData = fs.readJsonSync(filePath) as PokemonRaw;
    const processed = processPokemon(rawData);
    processedPokemon.push(processed);
  }
  
  // Save the processed data
  fs.writeJsonSync(OUTPUT_FILE, processedPokemon, { spaces: 2 });
  console.log(`Processed data saved to ${OUTPUT_FILE}`);
}

// Run the main function
processAllPokemon()
  .then(() => {
    console.log('Pokemon data processing completed successfully!');
  })
  .catch((error) => {
    console.error('Error in processing:', error);
    process.exit(1);
  });
