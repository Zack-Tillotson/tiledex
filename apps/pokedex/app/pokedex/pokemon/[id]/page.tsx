import React from 'react';
import { PokemonDetail } from '../../../../views/PokemonDetail';
import { getAllPokemon } from '@repo/pokeapi';

// @ts-expect-error - Next.js App Router type issues
export default function PokemonDetailPage({ params }) {
  return <PokemonDetail id={params.id} />;
}

// Force static rendering for this page
export const dynamic = 'force-static';

// Generate metadata for the page
// @ts-expect-error - Next.js App Router type issues
export async function generateMetadata({ params }) {
  const { id } = params;
  return {
    title: `Pokemon #${id} | Pokedex`,
    description: `Detailed information about Pokemon #${id}`,
  };
}

// Generate static params for all Pokemon
export async function generateStaticParams() {
  const allPokemon = getAllPokemon();
  
  return allPokemon.map(pokemon => ({
    id: pokemon.id.toString()
  }));
}
