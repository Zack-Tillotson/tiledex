import path from "path";
import { generations as utilsGenerations, GenerationData as UtilsGenerationData } from "../utils/generations";
import generationsData from "../data/generations.json";

export interface Generation {
  id: number;
  name: string;
  region: string;
  pokemon: number[];
  startId?: number;
  endId?: number;
  years?: string;
  iconicPokemon?: {
    id: number;
    name: string;
    imageUrl: string;
    type: string;
  };
}

export interface GenerationsData {
  generations: Generation[];
}

let generationsCache: GenerationsData | null = null;

export function getGenerations(): GenerationsData {
  if (generationsCache) {
    return generationsCache;
  }

  // Merge data from utils/generations.ts
  const data: GenerationsData = {
    generations: generationsData.generations.map((gen) => {
      const utilsGen = utilsGenerations.find((g) => g.id === gen.id);
      if (utilsGen) {
        return {
          ...utilsGen,
          ...gen,
        };
      }
      return gen;
    }),
  };

  generationsCache = data;
  return data;
}

export function getGeneration(id: number): Generation | undefined {
  const { generations } = getGenerations();
  return generations.find((g) => g.id === id);
}

export function getGenerationByPokemonId(pokemonId: number): Generation | undefined {
  const { generations } = getGenerations();
  return generations.find((g) => g.pokemon.includes(pokemonId));
}

export function getGenerationRomanNumeral(id: number): string {
  const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
  return romanNumerals[id - 1] || id.toString();
} 