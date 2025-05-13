import fs from 'fs-extra';
import path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { Pokemon } from '@repo/types';

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
const EVOLUTION_DIR = path.join(__dirname, 'evolution');
const POKEMON_FILE = path.join(argv.outputDir as string, 'pokemon.json');
const OUTPUT_FILE = path.join(argv.outputDir as string, 'pokemon.json');

// Interfaces for evolution data
interface EvolutionDetail {
  trigger: {
    name: string;
  };
  min_level?: number;
  item?: {
    name: string;
  };
  min_happiness?: number;
  time_of_day?: string;
  [key: string]: any; // For other possible evolution conditions
}

interface EvolutionNode {
  species: {
    name: string;
    url: string;
  };
  evolution_details: EvolutionDetail[];
  evolves_to: EvolutionNode[];
}

interface EvolutionChain {
  id: number;
  chain: EvolutionNode;
}

// Interface for processed evolution data to add to Pokemon
interface ProcessedEvolution {
  chain: ProcessedEvolutionNode[];
}

interface ProcessedEvolutionNode {
  pokemon: string; // Pokemon name
  trigger?: string;
  triggerDetail?: {
    level?: number;
    item?: string;
    happiness?: number;
    timeOfDay?: string;
    [key: string]: any;
  };
}

/**
 * Extract Pokemon ID from species URL
 */
function extractPokemonId(url: string): number | null {
  const match = url.match(/\/pokemon-species\/(\d+)\//); 
  return match && match[1] ? parseInt(match[1]) : null;
}

/**
 * Get Pokemon name by ID
 */
function getPokemonNameById(id: number, pokemonData: Pokemon[]): string | null {
  const pokemon = pokemonData.find(p => p.id === id);
  return pokemon ? pokemon.name : null;
}

/**
 * Process evolution details into a more usable format
 */
function processEvolutionDetail(detail: EvolutionDetail): { trigger: string; detail: any } {
  const result: { trigger: string; detail: any } = {
    trigger: detail.trigger.name,
    detail: {}
  };

  if (detail.min_level) {
    result.detail.level = detail.min_level;
  }

  if (detail.item) {
    result.detail.item = detail.item.name;
  }

  if (detail.min_happiness) {
    result.detail.happiness = detail.min_happiness;
  }

  if (detail.time_of_day) {
    result.detail.timeOfDay = detail.time_of_day;
  }

  // Add other evolution conditions as needed

  return result;
}

/**
 * Recursively process evolution chain nodes
 */
function processEvolutionNodes(
  node: EvolutionNode, 
  chain: ProcessedEvolutionNode[],
  pokemonData: Pokemon[],
  isFirstNode: boolean = true
): void {
  // Get species ID from URL
  const speciesUrl = node.species.url;
  const speciesId = extractPokemonId(speciesUrl);
  
  if (!speciesId) {
    console.warn(`Could not extract Pokemon ID from URL: ${speciesUrl}`);
    return;
  }

  // Get Pokemon name from ID
  const pokemonName = getPokemonNameById(speciesId, pokemonData);
  
  if (!pokemonName) {
    console.warn(`Pokemon with ID ${speciesId} not found in Pokemon data`);
    return;
  }

  // Add current Pokemon to the chain (only for the first node in the chain)
  if (isFirstNode) {
    chain.push({
      pokemon: pokemonName
    });
  }

  // Process each evolution
  for (const evolution of node.evolves_to) {
    const evoSpeciesUrl = evolution.species.url;
    const evoSpeciesId = extractPokemonId(evoSpeciesUrl);
    
    if (!evoSpeciesId) {
      console.warn(`Could not extract Pokemon ID from URL: ${evoSpeciesUrl}`);
      continue;
    }

    const evoPokemonName = getPokemonNameById(evoSpeciesId, pokemonData);
    
    if (!evoPokemonName) {
      console.warn(`Pokemon with ID ${evoSpeciesId} not found in Pokemon data`);
      continue;
    }

    // Process evolution details
    const evolutionDetail = evolution.evolution_details[0]; // Take the first evolution detail
    let trigger: string | undefined;
    let triggerDetail: any | undefined;
    
    if (evolutionDetail) {
      const processedDetail = processEvolutionDetail(evolutionDetail);
      trigger = processedDetail.trigger;
      triggerDetail = processedDetail.detail;
    }

    // Add evolution to the chain
    chain.push({
      pokemon: evoPokemonName,
      trigger,
      triggerDetail
    });

    // Process next evolution in the chain (pass false to indicate it's not the first node)
    if (evolution.evolves_to.length > 0) {
      // Recursive call with isFirstNode set to false to prevent duplication
      processEvolutionNodes(evolution, chain, pokemonData, false);
    }
  }
}

/**
 * Process a single evolution chain
 */
function processEvolutionChain(
  evolutionChain: EvolutionChain, 
  pokemonData: Pokemon[]
): { chain: ProcessedEvolutionNode[]; pokemonNames: string[] } {
  const processedChain: ProcessedEvolutionNode[] = [];
  
  // Process the evolution chain recursively
  processEvolutionNodes(evolutionChain.chain, processedChain, pokemonData, true);
  
  // Extract Pokemon names from the chain
  const pokemonNames = processedChain.map(node => node.pokemon);
  
  return { chain: processedChain, pokemonNames };
}

/**
 * Main function to process all evolution data
 */
async function processAllEvolutionData(): Promise<void> {
  console.log('Starting to process evolution data...');
  
  // Load Pokemon data
  if (!fs.existsSync(POKEMON_FILE)) {
    console.error(`Pokemon data file not found: ${POKEMON_FILE}`);
    console.error('Please run the Pokemon data ETL process first');
    process.exit(1);
  }
  
  const pokemonData: Pokemon[] = fs.readJsonSync(POKEMON_FILE);
  console.log(`Loaded ${pokemonData.length} Pokemon from ${POKEMON_FILE}`);
  
  // Get all evolution chain files
  if (!fs.existsSync(EVOLUTION_DIR)) {
    console.error(`Evolution data directory not found: ${EVOLUTION_DIR}`);
    console.error('Please run the evolution data ETL process first');
    process.exit(1);
  }
  
  const files = fs.readdirSync(EVOLUTION_DIR)
    .filter(file => file.endsWith('.json'))
    .sort((a, b) => {
      const idA = parseInt(a.split('.')[0] || '0');
      const idB = parseInt(b.split('.')[0] || '0');
      return idA - idB;
    });
  
  console.log(`Found ${files.length} evolution chain files to process`);
  
  // Process each evolution chain
  const evolutionMap: Record<string, ProcessedEvolution> = {};
  
  for (const file of files) {
    const filePath = path.join(EVOLUTION_DIR, file);
    const evolutionChain: EvolutionChain = fs.readJsonSync(filePath);
    
    try {
      const { chain, pokemonNames } = processEvolutionChain(evolutionChain, pokemonData);
      
      // Add evolution data to each Pokemon in the chain
      for (const pokemonName of pokemonNames) {
        evolutionMap[pokemonName] = { chain };
      }
      
      console.log(`Processed evolution chain #${evolutionChain.id} with ${pokemonNames.length} Pokemon`);
    } catch (error) {
      console.error(`Error processing evolution chain #${evolutionChain.id}:`, error);
    }
  }
  
  // Add evolution data to Pokemon
  let updatedCount = 0;
  
  for (let i = 0; i < pokemonData.length; i++) {
    const pokemon = pokemonData[i];
    if (pokemon && pokemon.name) {
      const evolution = evolutionMap[pokemon.name];
      
      if (evolution) {
        // Add evolution data to the Pokemon
        pokemonData[i] = {
          ...pokemon,
          evolution: evolution.chain
        };
        updatedCount++;
      }
    }
  }
  
  // Save the updated Pokemon data
  fs.writeJsonSync(OUTPUT_FILE, pokemonData, { spaces: 2 });
  console.log(`Updated ${updatedCount} Pokemon with evolution data`);
  console.log(`Saved updated Pokemon data to ${OUTPUT_FILE}`);
}

// Run the main function
processAllEvolutionData()
  .then(() => {
    console.log('Evolution data processing completed successfully!');
  })
  .catch((error) => {
    console.error('Error in processing:', error);
    process.exit(1);
  });
