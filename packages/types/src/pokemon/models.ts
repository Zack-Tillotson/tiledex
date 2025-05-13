/**
 * Pokemon data models
 * These interfaces define the structure of Pokemon data used throughout the application
 */

/**
 * Evolution node interface representing a single step in an evolution chain
 */
export interface EvolutionNode {
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
 * Core Pokemon interface representing a single Pokemon
 */
export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
    official_artwork: string;
  };
  stats: {
    name: string;
    base_stat: number;
  }[];
  height: number;
  weight: number;
  abilities: {
    name: string;
    is_hidden: boolean;
  }[];
  species: string;
  evolution?: EvolutionNode[];
}

/**
 * Pokemon type enum
 */
export enum PokemonType {
  NORMAL = 'normal',
  FIRE = 'fire',
  WATER = 'water',
  ELECTRIC = 'electric',
  GRASS = 'grass',
  ICE = 'ice',
  FIGHTING = 'fighting',
  POISON = 'poison',
  GROUND = 'ground',
  FLYING = 'flying',
  PSYCHIC = 'psychic',
  BUG = 'bug',
  ROCK = 'rock',
  GHOST = 'ghost',
  DRAGON = 'dragon',
  DARK = 'dark',
  STEEL = 'steel',
  FAIRY = 'fairy'
}

/**
 * Pokemon stat interface
 */
export interface PokemonStat {
  name: string;
  base_stat: number;
}

/**
 * Pokemon ability interface
 */
export interface PokemonAbility {
  name: string;
  is_hidden: boolean;
}
