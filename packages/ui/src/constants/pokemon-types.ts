import { POKEMON_TYPE_COLORS } from "@repo/types";

export const POKEMON_TYPES = Object.keys(POKEMON_TYPE_COLORS);

export function getPokemonTypeColor(type: string): string {
  const normalizedType = type.toLowerCase();
  return (
    POKEMON_TYPE_COLORS[normalizedType as keyof typeof POKEMON_TYPE_COLORS] ||
    "#777777"
  );
}

export function getTypeEnvironment(type: string): string {
  const environments: Record<string, string> = {
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
  };

  return environments[type.toLowerCase()] || "various";
}
