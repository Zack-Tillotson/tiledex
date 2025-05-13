'use client'

import React, { useState, useEffect } from 'react';
import { PokemonType as PokemonTypeComponent } from '@repo/ui/pokemon-type/pokemon-type';
import { getPokemonByType, getTypeByName } from '@repo/pokeapi';
import styles from './PokemonType.module.css';

interface PokemonTypeProps {
  typeId: string;
}

export function PokemonType({ typeId }: PokemonTypeProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [typeData, setTypeData] = useState<{
    name: string;
    pokemon: Array<{
      id: number;
      name: string;
      types: string[];
      sprites: {
        front_default: string;
        official_artwork?: string;
      };
      height: number;
      weight: number;
    }>;
    typeInfo?: {
      superEffectiveAgainst: string[];
      notVeryEffectiveAgainst: string[];
      noEffectAgainst: string[];
      weakTo: string[];
      resistantTo: string[];
      immuneTo: string[];
    };
  } | null>(null);

  useEffect(() => {
    async function fetchTypeData() {
      try {
        setLoading(true);
        
        // Normalize the type ID (lowercase)
        const normalizedTypeId = typeId.toLowerCase();
        
        // Get all Pokemon of this type
        const pokemonOfType = getPokemonByType(normalizedTypeId);
        
        if (pokemonOfType.length === 0) {
          setError(`No Pokémon found with type: ${normalizedTypeId}`);
          return;
        }
        
        // Get type effectiveness data
        const typeInfo = getTypeByName(normalizedTypeId);
        
        setTypeData({
          name: normalizedTypeId,
          pokemon: pokemonOfType,
          typeInfo: typeInfo ? {
            superEffectiveAgainst: typeInfo.superEffectiveAgainst,
            notVeryEffectiveAgainst: typeInfo.notVeryEffectiveAgainst,
            noEffectAgainst: typeInfo.noEffectAgainst,
            weakTo: typeInfo.weakTo,
            resistantTo: typeInfo.resistantTo,
            immuneTo: typeInfo.immuneTo
          } : undefined
        });
      } catch (err) {
        console.error('Error fetching type data:', err);
        setError('Failed to load Pokémon type data');
      } finally {
        setLoading(false);
      }
    }
    
    fetchTypeData();
  }, [typeId]);
  
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading {typeId} type data...</p>
      </div>
    );
  }
  
  if (error || !typeData) {
    return (
      <div className={styles.errorContainer}>
        <h2>Error</h2>
        <p>{error || 'Failed to load type data'}</p>
        <a href="/types" className={styles.backLink}>
          Back to Types
        </a>
      </div>
    );
  }
  
  return <PokemonTypeComponent typeData={typeData} />;
}

export default PokemonType;
