import { TypesView } from "@repo/pokedex/TypesView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pokémon Types | Pokédex",
  description:
    "Explore Pokémon by their types. Each type has unique characteristics and strengths.",
};

export default function TypesPage() {
  return <TypesView />;
} 