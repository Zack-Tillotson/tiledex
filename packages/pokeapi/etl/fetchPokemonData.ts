import axios from 'axios';
import fs from 'fs-extra';
import path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { EtlArgs, PokemonResponse } from './types';

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
      default: 151
    }
  })
  .help()
  .alias('help', 'h')
  .parseSync() as EtlArgs;

// Get command line arguments
const { rangeStart, rangeEnd } = argv;

console.log(`Using range: ${rangeStart} to ${rangeEnd}`);

// Configuration
const API_BASE_URL = 'https://pokeapi.co/api/v2';
const POKEMON_ENDPOINT = '/pokemon';
const OUTPUT_DIR = path.join(__dirname, 'pokemon');
const DELAY_MS = 100; // Delay between requests to avoid rate limiting

// Ensure the output directory exists
fs.ensureDirSync(OUTPUT_DIR);

/**
 * Fetches data for a single Pokemon by ID
 */
async function fetchPokemon(id: number): Promise<PokemonResponse | null> {
  try {
    const url = `${API_BASE_URL}${POKEMON_ENDPOINT}/${id}`;
    console.log(`Fetching Pokemon #${id} from ${url}`);
    
    // For development purposes only - disable certificate validation
    // In production, you should use proper certificate validation
    const response = await axios.get<PokemonResponse>(url, {
      httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false })
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error fetching Pokemon #${id}: ${error.message}`);
      if (error.response) {
        console.error(`Status: ${error.response.status}`);
      }
    } else {
      console.error(`Unknown error fetching Pokemon #${id}:`, error);
    }
    return null;
  }
}

/**
 * Saves Pokemon data to a JSON file
 */
function savePokemonData(pokemon: PokemonResponse): void {
  const filePath = path.join(OUTPUT_DIR, `${pokemon.id}.json`);
  fs.writeJsonSync(filePath, pokemon, { spaces: 2 });
  console.log(`Saved Pokemon #${pokemon.id} (${pokemon.name}) to ${filePath}`);
}

/**
 * Sleep function to add delay between API requests
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Main function to fetch all Pokemon data
 */
async function fetchAllPokemon(): Promise<void> {
  console.log(`Starting to fetch data for Pokemon from ID ${rangeStart} to ${rangeEnd}...`);
  console.log(`Data will be saved to ${OUTPUT_DIR}`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let id = rangeStart; id <= rangeEnd; id++) {
    const pokemon = await fetchPokemon(id);
    
    if (pokemon) {
      savePokemonData(pokemon);
      successCount++;
    } else {
      errorCount++;
    }
    
    // Add a small delay to avoid hitting rate limits
    await sleep(DELAY_MS);
  }
  
  console.log('\nFetch process completed!');
  console.log(`Successfully fetched: ${successCount} Pokemon`);
  console.log(`Errors: ${errorCount}`);
}

// Run the main function
fetchAllPokemon()
  .then(() => {
    console.log('Pokemon data fetch completed successfully!');
  })
  .catch((error) => {
    console.error('Error in main process:', error);
    process.exit(1);
  });
