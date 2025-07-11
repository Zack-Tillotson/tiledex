import { PokemonGrid } from "@repo/pokedex/PokemonGrid";
import { notFound } from "next/navigation";
import {
  generations,
  getGenerationById,
  type GenerationData,
} from "@repo/pokeapi";
import { Metadata } from "next";
import { Header } from "@repo/ui";

// Force static rendering for this page
export const dynamic = "force-static";

// Define the generation numbers for static generation
export async function generateStaticParams() {
  return generations.map((gen: GenerationData) => ({
    generation: gen.id.toString(),
  }));
}

// Generate metadata for the page
// @ts-expect-error - Next.js App Router type issues
export async function generateMetadata({ params }): Promise<Metadata> {
  const generationId = parseInt((await params).generation, 10);
  const generation = getGenerationById(generationId);

  if (!generation) {
    return {
      title: "Pokédex",
      description: "Explore Pokémon in the Pokédex",
    };
  }

  return {
    title: `${generation.name} (${generation.region}) | Pokédex`,
    description: `Browse Pokémon from ${generation.name} (${generation.years}) in the ${generation.region} region`,
  };
}

// @ts-expect-error - Next.js App Router type issues
export default async function PokedexGenerationPage({ params }) {
  // Parse the generation parameter
  const generationId = parseInt((await params).generation, 10);
  const generation = getGenerationById(generationId);

  if (!generation) {
    // If the generation is invalid, return 404
    notFound();
  }

  return (
    <>
      <Header level={1}>{generation.name}</Header>
      <PokemonGrid generation={generationId} />
    </>
  );
}
