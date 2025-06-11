import { PokedexPage } from "@repo/pokedex/PokedexPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pokédex | Explore Pokémon by Generation",
  description: "Browse Pokémon by generation, from Kanto to Galar regions.",
};

export default function Page() {
  return <PokedexPage />;
}
