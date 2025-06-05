import { Pokemon } from "@repo/types";
import { getPokemon, getAllPokemon } from "./pokemon";

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
let typeData: TypeInfo[] = [];

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-explicit-any
  const data = require("../data/types.json") as any;
  typeData = data;
} catch (error) {
  console.warn(
    "Type data not found. Run the ETL process to generate the data.",
  );
}

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
  return typeData.find((type) => type.name.toLowerCase() === normalizedName);
};

/**
 * Get Pokemon by type
 * @param type The Pokemon type (e.g., 'fire', 'water')
 * @returns An array of Pokemon of the specified type
 */
export const getPokemonByType = (type: string): Pokemon[] => {
  const normalizedType = type.toLowerCase();
  const results = getAllPokemon().filter((pokemon) =>
    pokemon.types.some((t: string) => t.toLowerCase() === normalizedType),
  );

  return results;
};

/**
 * Get count of Pokémon for each type
 * @returns An object with type names as keys and counts as values
 */
export const getTypeCounts = (): Record<string, number> => {
  const counts: Record<string, number> = {};

  // Initialize counts for all types
  typeData.forEach((type) => {
    counts[type.name] = 0;
  });

  // Count Pokémon for each type
  getAllPokemon().forEach((pokemon) => {
    pokemon.types.forEach((type) => {
      if (counts[type] !== undefined) {
        counts[type]++;
      }
    });
  });

  return counts;
}; 