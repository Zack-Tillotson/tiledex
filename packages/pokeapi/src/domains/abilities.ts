import { Pokemon } from "@repo/types";
import { getPokemon } from "./pokemon";

/**
 * Ability information interface
 */
export interface AbilityInfo {
  id: number;
  name: string;
  description: string;
  flavor_text: string;
  pokemon_ids: number[];
}

// Import data dynamically to avoid bundling issues
let abilityData: AbilityInfo[] = [];

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-explicit-any
  const data = require("../data/abilities.json") as any;
  abilityData = data;
} catch (error) {
  console.warn(
    "Ability data not found. Run the ETL process to generate the data.",
  );
}

/**
 * Get all abilities
 * @returns An array of all ability information
 */
export const getAllAbilities = (): AbilityInfo[] => {
  return [...abilityData];
};

/**
 * Get ability information by name
 * @param name The ability name (e.g., 'overgrow', 'blaze')
 * @returns The ability information or undefined if not found
 */
export const getAbilityByName = (name: string): AbilityInfo | undefined => {
  const normalizedName = name.toLowerCase();
  return abilityData.find((ability) => ability.name.toLowerCase() === normalizedName);
};

/**
 * Get ability information by ID
 * @param id The ability ID
 * @returns The ability information or undefined if not found
 */
export const getAbilityById = (id: number): AbilityInfo | undefined => {
  return abilityData.find((ability) => ability.id === id);
};

/**
 * Get Pokemon that have a specific ability
 * @param abilityName The ability name
 * @returns An array of Pokemon that have the specified ability
 */
export const getPokemonByAbility = (abilityName: string): Pokemon[] => {
  const ability = getAbilityByName(abilityName);
  if (!ability) return [];

  return ability.pokemon_ids
    .map((id) => getPokemon(id))
    .filter((pokemon): pokemon is Pokemon => pokemon !== undefined);
};

/**
 * Get count of Pokemon for each ability
 * @returns An object with ability names as keys and counts as values
 */
export const getAbilityCounts = (): Record<string, number> => {
  const counts: Record<string, number> = {};

  // Initialize counts for all abilities
  abilityData.forEach((ability) => {
    counts[ability.name] = ability.pokemon_ids.length;
  });

  return counts;
}; 