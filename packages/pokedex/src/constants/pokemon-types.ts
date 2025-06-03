import { POKEMON_TYPE_COLORS, type PokemonTypeKey } from "@repo/types";

export const POKEMON_TYPES = Object.keys(POKEMON_TYPE_COLORS);

/**
 * Maps Pokemon types to their typical environments
 */
export const TYPE_ENVIRONMENTS: Record<PokemonTypeKey, string> = {
  normal: "urban and rural",
  fire: "volcanic and arid",
  water: "aquatic and coastal",
  electric: "industrial and stormy",
  grass: "forest and jungle",
  ice: "arctic and mountainous",
  fighting: "urban and mountainous",
  poison: "urban and swamp",
  ground: "desert and cave",
  flying: "mountainous and forest",
  psychic: "urban and mysterious",
  bug: "forest and grassland",
  rock: "mountainous and cave",
  ghost: "abandoned and haunted",
  dragon: "mountainous and cave",
  dark: "dark and mysterious",
  steel: "industrial and cave",
  fairy: "enchanted and mysterious",
} as const;

/**
 * Get the typical environment for a Pokemon type
 * @param type - The Pokemon type to get the environment for
 * @returns The environment description or "various" if not found
 */
export function getTypeEnvironment(type: string): string {
  return TYPE_ENVIRONMENTS[type.toLowerCase() as PokemonTypeKey] || "various";
}

/**
 * Type guard to check if a string is a valid Pokemon type
 * @param type - The type to check
 * @returns True if the type is valid
 */
export function isPokemonType(type: string): type is PokemonTypeKey {
  return type.toLowerCase() in TYPE_ENVIRONMENTS;
} 