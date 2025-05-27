import { PokemonGrid } from "../../../../views/PokemonGrid";
import { notFound } from "next/navigation";
import {
  generations,
  getGenerationById,
  type GenerationData,
} from "@repo/pokeapi";
import { Metadata } from "next";

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
  const generationId = parseInt(params.generation, 10);
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
export default async function PokedexGenerationPage({ params, searchParams }) {
  // Parse the generation parameter
  const generationId = parseInt(params.generation, 10);
  const generation = getGenerationById(generationId);

  if (!generation) {
    // If the generation is invalid, return 404
    notFound();
  }

  // Helper function to get the first value from a string or array of strings
  const getParamValue = (
    param: string | string[] | undefined,
  ): string | undefined => {
    if (!param) return undefined;
    return Array.isArray(param) ? param[0] : param;
  };

  // Extract filter parameters from URL
  const nameParam = getParamValue(searchParams?.name) || "";
  const mainTypeParam = getParamValue(searchParams?.mainType) || "";

  const initialFilters = {
    ...(nameParam ? { name: nameParam } : {}),
    ...(mainTypeParam ? { mainType: mainTypeParam } : {}),
  };

  return (
    <PokemonGrid
      startIndex={generation.startId}
      endIndex={generation.endId}
      initialFilters={initialFilters}
      showFilters={false}
    />
  );
}
