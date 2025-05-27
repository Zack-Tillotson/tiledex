import { PokemonType } from "../../../views/PokemonType/PokemonType";
import { getAllTypes } from "@repo/pokeapi";
import { Metadata } from "next";

// Force static rendering for this page
export const dynamic = "force-static";

// Generate metadata for the page
// @ts-expect-error - Next.js App Router type issues
export async function generateMetadata({ params }) {
  const { typeId } = params;
  const formattedTypeId =
    typeId.charAt(0).toUpperCase() + typeId.slice(1).toLowerCase();

  return {
    title: `${formattedTypeId} Type Pokémon | Pokédex`,
    description: `View all ${formattedTypeId} type Pokémon and learn about their characteristics.`,
  };
}

// Generate static params for all Pokemon types
export async function generateStaticParams() {
  const allTypes = getAllTypes();

  return allTypes.map((type) => ({
    typeId: type.name.toLowerCase(),
  }));
}

// @ts-expect-error - Next.js App Router type issues
export default function TypePage({ params }) {
  const { typeId } = params;

  return <PokemonType typeId={typeId} />;
}
