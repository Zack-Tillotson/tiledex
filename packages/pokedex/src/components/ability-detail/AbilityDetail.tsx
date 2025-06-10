import React from 'react';
import styles from './AbilityDetail.module.css';
import { PokemonCard } from '../pokemon-card';

interface AbilityDetailProps {
  name: string;
  description: string;
  flavorText: string;
  pokemon: Array<{
    id: number;
    name: string;
    types: string[];
    sprites: {
      front_default: string;
      back_default?: string;
      front_shiny?: string;
      back_shiny?: string;
      official_artwork?: string;
    };
    height: number;
    weight: number;
  }>;
}

export function AbilityDetail({ name, description, flavorText, pokemon }: AbilityDetailProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{name}</h1>
      
      <div className={styles.section}>
        <h2>Summary</h2>
        <p>{flavorText}</p>
      </div>

      <div className={styles.section}>
        <h2>Details</h2>
        <p>{description}</p>
      </div>

      <div className={styles.section}>
        <h2>Pokemon with this Ability</h2>
        <div className={styles.pokemonGrid}>
          {pokemon.map((p) => (
            <PokemonCard
              key={p.id}
              pokemon={p}
              href={`/pokedex/pokemon/${p.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 