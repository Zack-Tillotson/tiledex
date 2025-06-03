"use client";

import React, { useState, useEffect } from "react";
import styles from "./PokemonGrid.module.css";
import { getAllPokemon, searchPokemon, type Pokemon } from "@repo/pokeapi";
import { PokemonGrid as PokemonGridUI } from "../../components/pokemon-grid";

interface PokemonGridProps {
  startIndex?: number;
  endIndex?: number;
  initialFilters?: {
    name?: string;
  };
  showFilters?: boolean;
}

export function PokemonGrid({
  startIndex = 1,
  endIndex = 50,
  initialFilters = {},
}: PokemonGridProps) {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  // Load and filter Pokémon based on range and name filter
  useEffect(() => {
    let filteredPokemon: Pokemon[] = [];

    // If there's a name filter, use searchPokemon
    if (initialFilters.name) {
      filteredPokemon = searchPokemon(initialFilters.name);
    } else {
      // Otherwise get all Pokémon
      filteredPokemon = getAllPokemon();
    }

    // Store the total count
    setTotalItems(filteredPokemon.length);

    // Filter by range (startIndex to endIndex)
    // Adjust for 0-based indexing in array vs 1-based indexing in UI
    const adjustedStartIndex = Math.max(0, startIndex - 1);
    const adjustedEndIndex = Math.min(endIndex, filteredPokemon.length);

    // Slice the array to get only the Pokémon in the specified range
    filteredPokemon = filteredPokemon.slice(
      adjustedStartIndex,
      adjustedEndIndex,
    );

    setPokemon(filteredPokemon);
  }, [startIndex, endIndex, initialFilters.name]);

  return (
    <div className={styles.container}>
      {/* Results Count */}
      <div className={styles.resultsCount}>
        {totalItems > 0 ? (
          <>
            {pokemon.length} of {totalItems} Pokémon shown
            {initialFilters.name && <> (filtered by name)</>}
          </>
        ) : (
          "No Pokémon found"
        )}
      </div>

      <PokemonGridUI pokemon={pokemon} />
    </div>
  );
}
