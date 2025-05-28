import React, { useMemo } from "react";
import Link from "next/link";
import styles from "./PokemonDetail.module.css";
import {
  getPokemon,
  getAllPokemon,
  getGenerationByPokemonId,
  getGenerationRomanNumeral,
} from "@repo/pokeapi";
import { PokemonDetail as PokemonDetailUI } from "@repo/ui";

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

  // Get the generation data for this Pokémon
  const generation = getGenerationByPokemonId(pokemon.id);
  if (!generation) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.backLinkContainer}>
        <Link
          href={`/pokedex/generation/${generation.id}`}
          className={styles.backLink}
        >
          &larr; Back to Generation {getGenerationRomanNumeral(generation.id)}
        </Link>
      </div>

      <PokemonDetailUI
        pokemon={pokemon}
        pokemonData={allPokemon}
        renderTypeLink={(type: string, children: React.ReactNode) => (
          <Link
            href={`/types/${type.toLowerCase()}`}
            className={styles.typeLink}
          >
            {children}
          </Link>
        )}
        renderPokemonLink={(pokemonName: string, children: React.ReactNode) => {
          // Find the Pokémon ID by name to create the correct link
          const pokemonForLink = allPokemon.find(
            (p) => p.name.toLowerCase() === pokemonName.toLowerCase(),
          );
          if (!pokemonForLink) return children;

          return (
            <Link
              href={`/pokedex/pokemon/${pokemonForLink.id}`}
              className={styles.pokemonLink}
            >
              {children}
            </Link>
          );
        }}
      />
    </div>
  );
}

export default PokemonDetail;
