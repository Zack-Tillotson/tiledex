/**
 * Type definitions for the PokeAPI ETL process
 */
import { Pokemon } from "@repo/types";

/**
 * Command line arguments for the ETL process
 */
export interface EtlArgs {
  rangeStart: number;
  rangeEnd: number;
}

/**
 * Raw Pokemon data from the PokeAPI
 */
export interface PokemonResponse {
  id: number;
  name: string;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  height: number;
  weight: number;
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  species: {
    name: string;
    url: string;
  };
}

/**
 * Processed Pokemon data for the package
 * This matches the Pokemon interface from @repo/types
 */
export type ProcessedPokemon = Pokemon;

/**
 * Raw ability data from the PokeAPI
 */
export interface AbilityResponse {
  id: number;
  name: string;
  effect_entries: {
    effect: string;
    language: {
      name: string;
    };
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
    version_group: {
      name: string;
    };
  }[];
}

/**
 * Processed ability data for the package
 */
export interface ProcessedAbility {
  id: number;
  name: string;
  description: string;
  flavor_text: string;
}
