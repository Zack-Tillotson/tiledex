import { getAllPokemon, searchPokemon, getGeneration, type Pokemon } from "@repo/pokeapi";

interface PokemonFilterOptions {
  range?: string; // Format: "start-end"
  generation?: number;
  name?: string;
}

interface FilterRange {
  startIndex: number;
  endIndex: number;
}

function parseRange(range: string): FilterRange | null {
  const [startStr, endStr] = range.split("-");
  const start = startStr ? parseInt(startStr, 10) : undefined;
  const end = endStr ? parseInt(endStr, 10) : undefined;
  
  if (start === undefined || end === undefined || isNaN(start) || isNaN(end)) {
    return null;
  }

  return {
    startIndex: Math.max(0, start - 1), // Convert to 0-based index
    endIndex: end,
  };
}

export function usePokemonFilter({
  range,
  generation,
  name,
}: PokemonFilterOptions): {
  pokemon: Pokemon[];
  totalItems: number;
} {
  // 1. Get all Pokémon
  const allPokemon = getAllPokemon();
  let filteredPokemon = allPokemon;

  // 2. Apply generation filter if specified
  if (generation !== undefined) {
    const genData = getGeneration(generation);
    if (genData) {
      // Filter pokemon to only include those in the generation's pokemon array
      filteredPokemon = filteredPokemon.filter(pokemon => 
        genData.pokemon.includes(pokemon.id)
      );
    }
  }
  // 3. Apply range filter if we have one (only if no generation is specified)
  else if (range) {
    const filterRange = parseRange(range);
    if (filterRange) {
      filteredPokemon = filteredPokemon.slice(
        filterRange.startIndex,
        filterRange.endIndex
      );
    }
  }

  // 4. Apply name filter if we have one
  if (name) {
    filteredPokemon = filteredPokemon.filter(pokemon => 
      pokemon.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  return {
    pokemon: filteredPokemon,
    totalItems: filteredPokemon.length,
  };
} 