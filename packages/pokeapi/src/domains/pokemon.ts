import { Pokemon } from "@repo/types";
import { useLocalImagesForPokemon } from "../utils/imageUtils";

// Import data dynamically to avoid bundling issues
let pokemonData: Pokemon[] = [];

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-explicit-any
  const data = require("../data/pokemon.json") as any;
  pokemonData = data;
} catch (error) {
  console.warn(
    "Pokemon data not found. Run the ETL process to generate the data.",
  );
}

/**
 * Get a Pokemon by its ID
 * @param id The Pokemon ID
 * @returns The Pokemon data or undefined if not found
 */
export const getPokemon = (id: number): Pokemon | undefined => {
  const pokemon = pokemonData.find((pokemon) => pokemon.id === id);
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
  const results = pokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(normalizedQuery),
  );

  // Apply local image paths to results
  return results.map((pokemon) => useLocalImagesForPokemon(pokemon));
};

/**
 * Get all Pokemon
 * @returns An array of all Pokemon
 */
export const getAllPokemon = (): Pokemon[] => {
  // Apply local image paths to all Pokemon
  return pokemonData.map((pokemon) => useLocalImagesForPokemon(pokemon));
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
export const getPaginatedPokemon = (
  page: number = 1,
  pageSize: number = 20,
): PaginatedPokemonResult => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = pokemonData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(pokemonData.length / pageSize);

  return {
    // Apply local image paths to paginated Pokemon
    pokemon: paginatedData.map((pokemon) => useLocalImagesForPokemon(pokemon)),
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: pokemonData.length,
      pageSize,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
}; 