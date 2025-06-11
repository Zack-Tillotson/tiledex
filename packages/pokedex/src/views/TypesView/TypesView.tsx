"use client";

import React from "react";
import Link from "next/link";
import styles from "./TypesView.module.css";
import { TypesGrid } from "../../components/types-grid";
import { getPokemonByType } from "@repo/pokeapi";
import { POKEMON_TYPE_COLORS } from "@repo/types";
import { Header, Text } from "@repo/ui";

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
      <div className={styles.header}>
        <Link href="/pokedex" className={styles.backLink}>
          &larr; Back to Pokédex
        </Link>
        <Header level={1} className={styles.title}>Pokémon Types</Header>
        <Text variant="body" className={styles.description}>
          Explore Pokémon by their types. Each type has unique characteristics and
          strengths.
        </Text>
      </div>

      <TypesGrid
        types={typeInfoList}
        getTypeHref={(type: string) => `/pokedex/types/${type}`}
      />
    </div>
  );
}

export default TypesView;
