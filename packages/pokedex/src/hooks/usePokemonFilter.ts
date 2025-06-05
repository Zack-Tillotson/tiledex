import { getAllPokemon, searchPokemon, getGenerationById, type Pokemon } from "@repo/pokeapi";

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

function getGenerationRange(generation: number): FilterRange | null {
  const genData = getGenerationById(generation);
  if (!genData) {
    return null;
  }

  return {
    startIndex: genData.startId - 1, // Convert to 0-based index
    endIndex: genData.endId,
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

  // 2. Determine the range to filter by
  let filterRange: FilterRange | null = null;
  
  if (range) {
    filterRange = parseRange(range);
  } else if (generation !== undefined) {
    filterRange = getGenerationRange(generation);
  }

  // 3. Apply range filter if we have one
  if (filterRange) {
    filteredPokemon = filteredPokemon.slice(
      filterRange.startIndex,
      filterRange.endIndex
    );
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