import { GenerationGrid } from "../../views/GenerationGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pokédex | Explore Pokémon by Generation",
  description: "Browse Pokémon by generation, from Kanto to Galar regions.",
};

// This page is static by default in Next.js App Router
// The GenerationGrid component doesn't fetch data on the server

export const dynamic = "force-static";

export default function PokedexPage() {
  return <GenerationGrid />;
}
