"use client";

import React from "react";
import Link from "next/link";
import styles from "./TypesView.module.css";
import { TypesGrid } from "@repo/ui/types-grid";
import { getPokemonByType } from "@repo/pokeapi";
import { POKEMON_TYPE_COLORS, PokemonTypeKey } from "@repo/types";

// Define TypeInfo interface locally to avoid import issues
interface TypeInfo {
  name: string;
  count: number;
}

// List of all Pokémon types
const pokemonTypes = Object.keys(POKEMON_TYPE_COLORS);

export function TypesView() {
  // Calculate the count of Pokémon for each type
  const typeInfoList: TypeInfo[] = pokemonTypes.map((type) => ({
    name: type,
    count: getPokemonByType(type).length,
  }));

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pokémon Types</h1>
      <p className={styles.description}>
        Explore Pokémon by their types. Each type has unique characteristics and
        strengths.
      </p>

      <TypesGrid
        types={typeInfoList}
        linkComponent={Link}
        getTypeHref={(type: string) => `/types/${type}`}
      />
    </div>
  );
}

export default TypesView;
