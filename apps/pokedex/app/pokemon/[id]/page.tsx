import React from 'react';
import { PokemonDetail } from '../../../views/PokemonDetail';

interface PokemonDetailPageProps {
  params: {
    id: string;
  };
}

export default function PokemonDetailPage({ params }: PokemonDetailPageProps) {
  return <PokemonDetail id={params.id} />;
}

// Generate metadata for the page
export function generateMetadata({ params }: PokemonDetailPageProps) {
  return {
    title: `Pokemon #${params.id} | Pokedex`,
    description: `Detailed information about Pokemon #${params.id}`,
  };
}
