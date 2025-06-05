"use client";

import React from "react";
import styles from "./PokemonGrid.module.css";
import { PokemonGrid as PokemonGridUI } from "../../components/pokemon-grid";
import { usePokemonFilter } from "../../hooks/usePokemonFilter";
import { Header } from "@repo/ui";

interface PokemonGridProps {
  range?: string; // Format: "start-end"
  generation?: number;
  name?: string;
}

export function PokemonGrid({
  range,
  generation,
  name,
}: PokemonGridProps) {
  const { pokemon } = usePokemonFilter({
    range,
    generation,
    name,
  });

  return (
    <div className={styles.container}>
      <PokemonGridUI pokemon={pokemon} />
    </div>
  );
}
