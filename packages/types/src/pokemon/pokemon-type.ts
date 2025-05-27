import { PokemonTypeKey, POKEMON_TYPE_COLORS } from "./pokemon-colors";

export interface PokemonTypeData {
  name: PokemonTypeKey;
  pokemon: Array<{
    id: number;
    name: string;
    types: PokemonTypeKey[];
    sprites: {
      front_default: string;
      official_artwork?: string;
    };
    height: number;
    weight: number;
  }>;
  // Type effectiveness data
  typeInfo?: {
    superEffectiveAgainst: PokemonTypeKey[];
    notVeryEffectiveAgainst: PokemonTypeKey[];
    noEffectAgainst: PokemonTypeKey[];
    weakTo: PokemonTypeKey[];
    resistantTo: PokemonTypeKey[];
    immuneTo: PokemonTypeKey[];
  };
}

export type PokemonTypeColors = typeof POKEMON_TYPE_COLORS;

export interface PokemonTypeProps {
  typeData: PokemonTypeData;
  className?: string;
}
