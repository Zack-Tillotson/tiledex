'use client'

import React from 'react';
import Link from 'next/link';
import styles from './TypesView.module.css';
import { getPokemonByType } from '@repo/pokeapi';

// Define TypeInfo interface locally to avoid import issues
interface TypeInfo {
  name: string;
  count: number;
}

// Create a simplified version of the TypesGrid component directly in this file
function TypesGrid({ 
  types, 
  linkComponent: LinkComponent,
  getTypeHref 
}: {
  types: TypeInfo[];
  linkComponent: React.ComponentType<{ href: string; className?: string; children: React.ReactNode }>;
  getTypeHref: (type: string) => string;
}) {
  return (
    <div className={styles.typesGrid}>
      {types.map((type) => (
        <div key={type.name} className={styles.typeCard}>
          <LinkComponent href={getTypeHref(type.name)} className={styles.typeLink}>
            <div 
              className={styles.typeCardInner}
              style={{ 
                backgroundColor: getTypeColor(type.name)
              }}
            >
              <h2 className={styles.typeName}>{type.name}</h2>
              <div className={styles.typeCount}>{type.count} Pokémon</div>
            </div>
          </LinkComponent>
        </div>
      ))}
    </div>
  );
}
// Type color mapping
function getTypeColor(type: string): string {
  const typeColors: Record<string, string> = {
    'normal': "#A8A878",
    'fire': "#F08030",
    'water': "#6890F0",
    'electric': "#F8D030",
    'grass': "#78C850",
    'ice': "#98D8D8",
    'fighting': "#C03028",
    'poison': "#A040A0",
    'ground': "#E0C068",
    'flying': "#A890F0",
    'psychic': "#F85888",
    'bug': "#A8B820",
    'rock': "#B8A038",
    'ghost': "#705898",
    'dragon': "#7038F8",
    'dark': "#705848",
    'steel': "#B8B8D0",
    'fairy': "#EE99AC"
  };
  
  return typeColors[type] || "#777";
}

// List of all Pokémon types
const pokemonTypes = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice', 
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

export function TypesView() {
  // Calculate the count of Pokémon for each type
  const typeInfoList: TypeInfo[] = pokemonTypes.map(type => ({
    name: type,
    count: getPokemonByType(type).length
  }));
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pokémon Types</h1>
      <p className={styles.description}>
        Explore Pokémon by their types. Each type has unique characteristics and strengths.
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
