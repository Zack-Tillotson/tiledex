/**
 * PokeAPI data interface
 * This package contains static data from the pokeapi.co website
 * for use in the Pokedex application.
 */

// Import types from the types package
import { Pokemon, PokemonType } from "@repo/types";

// Import generations utilities
import {
  generations,
  getGenerationById,
  getGenerationByPokemonId,
  getGenerationRomanNumeral,
  type GenerationData,
} from "./utils/generations";

// Import domain-specific functionality
import * as PokemonDomain from "./domains/pokemon";
import * as TypesDomain from "./domains/types";
import * as AbilitiesDomain from "./domains/abilities";
import * as GenerationDomain from "./domains/generation";

// Re-export types for convenience
export type { Pokemon, PokemonType } from "@repo/types";
export type { GenerationData } from "./utils/generations";
export type { TypeInfo } from "./domains/types";
export type { AbilityInfo } from "./domains/abilities";
export type { PaginationData, PaginatedPokemonResult } from "./domains/pokemon";
export type { Generation, GenerationsData } from "./domains/generation";

// Re-export generations utilities
export {
  generations,
  getGenerationById,
  getGenerationByPokemonId,
  getGenerationRomanNumeral,
};

// Re-export Pokemon domain functionality
export const {
  getPokemon,
  searchPokemon,
  getAllPokemon,
  getPaginatedPokemon,
} = PokemonDomain;

// Re-export Types domain functionality
export const {
  getAllTypes,
  getTypeByName,
  getPokemonByType,
  getTypeCounts,
} = TypesDomain;

// Re-export Abilities domain functionality
export const {
  getAllAbilities,
  getAbilityByName,
  getAbilityById,
  getPokemonByAbility,
  getAbilityCounts,
} = AbilitiesDomain;

// Re-export Generation domain functionality
export const {
  getGenerations,
  getGeneration,
  getGenerationByPokemonId: getGenerationByPokemonIdFromDomain,
  getGenerationRomanNumeral: getGenerationRomanNumeralFromDomain,
} = GenerationDomain; 