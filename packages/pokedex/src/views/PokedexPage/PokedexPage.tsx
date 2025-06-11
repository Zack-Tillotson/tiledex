"use client";

import React from "react";
import styles from "./PokedexPage.module.css";
import { Header, Link } from "@repo/ui";
import { GenerationGrid } from "../GenerationGrid/GenerationGrid";

export function PokedexPage() {
  return (
    <div className={styles.container}>
      <Header level={1} className={styles.heading}>
        Pokédex
      </Header>

      <div className={styles.navigation}>
        <Link
          variant="primary"
          size="large"
          href="/pokedex/search"
          className={styles.searchButtonLink}
        >
          Search All Pokémon
        </Link>

        <Link
          variant="secondary"
          size="large"
          href="/pokedex/types"
          className={styles.typesButtonLink}
        >
          Browse by Type
        </Link>
      </div>

      <GenerationGrid />
    </div>
  );
}

export default PokedexPage; 