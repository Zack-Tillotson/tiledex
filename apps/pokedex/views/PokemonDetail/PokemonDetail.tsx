import React, { useMemo } from 'react';
import { getPokemon, getAllPokemon } from '@repo/pokeapi';
import { PokemonDetail as PokemonDetailUI } from '@repo/ui/src/pokemon-detail';
import styles from './PokemonDetail.module.css';
import Link from 'next/link';

interface PokemonDetailProps {
  id: string;
}

export function PokemonDetail({ id }: PokemonDetailProps) {
  // Convert id to number and fetch the pokemon data
  const pokemonId = parseInt(id, 10);
  const pokemon = getPokemon(pokemonId);
  
  // Get all Pokémon data to provide to the evolution component
  const allPokemon = useMemo(() => {
    // If the current Pokémon has evolution data, we need to fetch all Pokémon
    // to ensure we have data for each Pokémon in the evolution chain
    if (pokemon?.evolution && pokemon.evolution.length > 0) {
      return getAllPokemon();
    }
    // Otherwise, just return the current Pokémon to avoid unnecessary data loading
    return pokemon ? [pokemon] : [];
  }, [pokemon]);

  // Helper function to determine the correct range based on Pokémon ID
  const getGenerationRange = (pokemonId: number): string => {
    if (pokemonId <= 151) return '1-151'; // Gen 1
    if (pokemonId <= 251) return '152-251'; // Gen 2
    if (pokemonId <= 386) return '252-386'; // Gen 3
    if (pokemonId <= 493) return '387-493'; // Gen 4
    if (pokemonId <= 649) return '494-649'; // Gen 5
    if (pokemonId <= 721) return '650-721'; // Gen 6
    if (pokemonId <= 809) return '722-809'; // Gen 7
    return '810-898'; // Gen 8
  };

  // If pokemon not found, show error message
  if (!pokemon) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h1>Pokemon Not Found</h1>
          <p>Sorry, we couldn&apos;t find a Pokemon with ID: {id}</p>
          <Link href="/pokedex" className={styles.backLink}>
            Back to Pokedex
          </Link>
        </div>
      </div>
    );
  }
  
  // Get the correct range for this Pokémon
  const generationRange = getGenerationRange(pokemon.id);

  return (
    <div className={styles.container}>
      <div className={styles.backLinkContainer}>
        <Link href={`/pokedex/${generationRange}`} className={styles.backLink}>
          &larr; Back to Generation {pokemon.id <= 151 ? 'I' : 
                                   pokemon.id <= 251 ? 'II' : 
                                   pokemon.id <= 386 ? 'III' : 
                                   pokemon.id <= 493 ? 'IV' : 
                                   pokemon.id <= 649 ? 'V' : 
                                   pokemon.id <= 721 ? 'VI' : 
                                   pokemon.id <= 809 ? 'VII' : 'VIII'}
        </Link>
      </div>
      
      <PokemonDetailUI 
        pokemon={pokemon}
        pokemonData={allPokemon}
        renderTypeLink={(type, children) => (
          <Link href={`/types/${type.toLowerCase()}`} className={styles.typeLink}>
            {children}
          </Link>
        )}
        renderPokemonLink={(pokemonName, children) => {
          // Find the Pokémon ID by name to create the correct link
          const pokemonForLink = allPokemon.find(p => p.name.toLowerCase() === pokemonName.toLowerCase());
          if (!pokemonForLink) return children;
          
          return (
            <Link href={`/pokedex/pokemon/${pokemonForLink.id}`} className={styles.pokemonLink}>
              {children}
            </Link>
          );
        }}
      />
    </div>
  );
}

export default PokemonDetail;
