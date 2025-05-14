'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './GenerationGrid.module.css';

// Type color mapping for the starter Pokémon badges
const typeColors: Record<string, string> = {
  Grass: '#78C850',
  Fire: '#F08030',
  Water: '#6890F0'
};

// Define the generation data with starter Pokémon for each generation, rotating through the three basic types
const generations = [
  {
    id: 1,
    name: 'Generation I',
    range: '1-151',
    description: 'Kanto Region (1996-1999)',
    iconicPokemon: {
      id: 1,
      name: 'Bulbasaur',
      imageUrl: '/images/official_artwork/1.png',
      type: 'Grass'
    }
  },
  {
    id: 2,
    name: 'Generation II',
    range: '152-251',
    description: 'Johto Region (1999-2002)',
    iconicPokemon: {
      id: 155,
      name: 'Cyndaquil',
      imageUrl: '/images/official_artwork/155.png',
      type: 'Fire'
    }
  },
  {
    id: 3,
    name: 'Generation III',
    range: '252-386',
    description: 'Hoenn Region (2002-2006)',
    iconicPokemon: {
      id: 258,
      name: 'Mudkip',
      imageUrl: '/images/official_artwork/258.png',
      type: 'Water'
    }
  },
  {
    id: 4,
    name: 'Generation IV',
    range: '387-493',
    description: 'Sinnoh Region (2006-2010)',
    iconicPokemon: {
      id: 387,
      name: 'Turtwig',
      imageUrl: '/images/official_artwork/387.png',
      type: 'Grass'
    }
  },
  {
    id: 5,
    name: 'Generation V',
    range: '494-649',
    description: 'Unova Region (2010-2013)',
    iconicPokemon: {
      id: 498,
      name: 'Tepig',
      imageUrl: '/images/official_artwork/498.png',
      type: 'Fire'
    }
  },
  {
    id: 6,
    name: 'Generation VI',
    range: '650-721',
    description: 'Kalos Region (2013-2016)',
    iconicPokemon: {
      id: 656,
      name: 'Froakie',
      imageUrl: '/images/official_artwork/656.png',
      type: 'Water'
    }
  },
  {
    id: 7,
    name: 'Generation VII',
    range: '722-809',
    description: 'Alola Region (2016-2019)',
    iconicPokemon: {
      id: 722,
      name: 'Rowlet',
      imageUrl: '/images/official_artwork/722.png',
      type: 'Grass'
    }
  },
  {
    id: 8,
    name: 'Generation VIII',
    range: '810-898',
    description: 'Galar Region (2019-2022)',
    iconicPokemon: {
      id: 813,
      name: 'Scorbunny',
      imageUrl: '/images/official_artwork/813.png',
      type: 'Fire'
    }
  }
];

export function GenerationGrid() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Pokédex</h1>
      
      <Link href="/pokedex/search" className={styles.searchButton}>
        Search All Pokémon
      </Link>
      
      <div className={styles.grid}>
        {generations.map((gen) => (
          <Link 
            key={gen.id} 
            href={`/pokedex/${gen.range}`} 
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
              <h2 className={styles.title}>{gen.name}</h2>
              <p className={styles.description}>{gen.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default GenerationGrid;
