/**
 * PokeAPI data interface
 * This package contains static data from the pokeapi.co website
 * for use in the Pokedex application.
 */

// Import types from the types package
import { Pokemon, PokemonType } from '@repo/types';

// Import image utilities
import { useLocalImagesForPokemon } from './utils/imageUtils';

// Re-export types for convenience
export type { Pokemon, PokemonType } from '@repo/types';

/**
 * Type information interface
 */
export interface TypeInfo {
  id: number;
  name: string;
  superEffectiveAgainst: string[];
  notVeryEffectiveAgainst: string[];
  noEffectAgainst: string[];
  weakTo: string[];
  resistantTo: string[];
  immuneTo: string[];
}

// Import data dynamically to avoid bundling issues
let pokemonData: Pokemon[] = [];
let typeData: TypeInfo[] = [];

try {
  // In a production environment, this would be imported directly
  // For now, we'll handle it dynamically to avoid issues if the data doesn't exist yet
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-explicit-any
  const data = require('./data/pokemon.json') as any;
  pokemonData = data;
} catch (error) {
  console.warn('Pokemon data not found. Run the ETL process to generate the data.');
}

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-explicit-any
  const data = require('./data/types.json') as any;
  typeData = data;
} catch (error) {
  console.warn('Type data not found. Run the ETL process to generate the data.');
}

/**
 * Get a Pokemon by its ID
 * @param id The Pokemon ID
 * @returns The Pokemon data or undefined if not found
 */
export const getPokemon = (id: number): Pokemon | undefined => {
  const pokemon = pokemonData.find(pokemon => pokemon.id === id);
  if (pokemon) {
    return useLocalImagesForPokemon(pokemon);
  }
  return undefined;
};

/**
 * Search for Pokemon by name
 * @param query The search query (case insensitive)
 * @returns An array of matching Pokemon
 */
export const searchPokemon = (query: string): Pokemon[] => {
  const normalizedQuery = query.toLowerCase();
  const results = pokemonData.filter(pokemon => 
    pokemon.name.toLowerCase().includes(normalizedQuery));
  
  // Apply local image paths to results
  return results.map(pokemon => useLocalImagesForPokemon(pokemon));
};

/**
 * Get all Pokemon
 * @returns An array of all Pokemon
 */
export const getAllPokemon = (): Pokemon[] => {
  // Apply local image paths to all Pokemon
  return pokemonData.map(pokemon => useLocalImagesForPokemon(pokemon));
};

/**
 * Pagination metadata interface
 */
export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Paginated Pokemon result interface
 */
export interface PaginatedPokemonResult {
  pokemon: Pokemon[];
  pagination: PaginationData;
}

/**
 * Get paginated Pokemon
 * @param page The page number (1-based)
 * @param pageSize The number of Pokemon per page
 * @returns An object containing the paginated Pokemon and pagination metadata
 */
export const getPaginatedPokemon = (page: number = 1, pageSize: number = 20): PaginatedPokemonResult => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = pokemonData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(pokemonData.length / pageSize);
  
  return {
    // Apply local image paths to paginated Pokemon
    pokemon: paginatedData.map(pokemon => useLocalImagesForPokemon(pokemon)),
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: pokemonData.length,
      pageSize,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1
    }
  };
};

/**
 * Get Pokemon by type
 * @param type The Pokemon type (e.g., 'fire', 'water')
 * @returns An array of Pokemon of the specified type
 */
export const getPokemonByType = (type: string): Pokemon[] => {
  const normalizedType = type.toLowerCase();
  const results = pokemonData.filter(pokemon => 
    pokemon.types.some((t: string) => t.toLowerCase() === normalizedType));
  
  // Apply local image paths to results
  return results.map(pokemon => useLocalImagesForPokemon(pokemon));
};

/**
 * Get all Pokémon types
 * @returns An array of all Pokémon type information
 */
export const getAllTypes = (): TypeInfo[] => {
  return [...typeData];
};

/**
 * Get type information by name
 * @param name The type name (e.g., 'fire', 'water')
 * @returns The type information or undefined if not found
 */
export const getTypeByName = (name: string): TypeInfo | undefined => {
  const normalizedName = name.toLowerCase();
  return typeData.find(type => type.name.toLowerCase() === normalizedName);
};

/**
 * Get count of Pokémon for each type
 * @returns An object with type names as keys and counts as values
 */
export const getTypeCounts = (): Record<string, number> => {
  const counts: Record<string, number> = {};
  
  // Initialize counts for all types
  typeData.forEach(type => {
    counts[type.name] = 0;
  });
  
  // Count Pokémon for each type
  pokemonData.forEach(pokemon => {
    pokemon.types.forEach(type => {
      if (counts[type] !== undefined) {
        counts[type]++;
      }
    });
  });
  
  return counts;
};
