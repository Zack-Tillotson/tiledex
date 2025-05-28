"use client";

import React from "react";
import Image from "next/image";
import styles from "./GenerationGrid.module.css";
import { Card, Header, Text, Link } from "@repo/ui";
import { generations, type GenerationData } from "@repo/pokeapi";

// Type color mapping for the starter Pokémon badges
const typeColors: Record<string, string> = {
  Grass: "#78C850",
  Fire: "#F08030",
  Water: "#6890F0",
};

export function GenerationGrid() {
  return (
    <div className={styles.container}>
      <Header level={1} className={styles.heading}>
        Pokédex
      </Header>

      <Link
        variant="primary"
        size="large"
        href="/pokedex/search"
        className={styles.searchButtonLink}
      >
        Search All Pokémon
      </Link>

      <div className={styles.grid}>
        {generations.map((gen: GenerationData) => (
          <Card
            key={gen.id}
            linkComponent={Link}
            href={`/pokedex/generation/${gen.id}`}
            className={styles.card}
          >
            <div className={styles.imageContainer}>
              <Image
                src={gen.iconicPokemon.imageUrl}
                alt={gen.iconicPokemon.name}
                className={styles.image}
                width={150}
                height={150}
                priority={gen.id <= 4} // Prioritize loading the first 4 images
              />
            </div>
            <div className={styles.content}>
              <Header level={2} className={styles.title}>
                {gen.name}
              </Header>
              <Text variant="body" className={styles.description}>
                {gen.region} Region ({gen.years})
              </Text>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default GenerationGrid;
