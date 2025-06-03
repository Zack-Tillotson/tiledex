import { SearchView } from "@repo/pokedex/SearchView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Pokémon | Pokédex",
  description: "Search for Pokémon by name",
};

// Force static rendering for this page
// The search functionality works client-side with Zustand
export const dynamic = "force-static";

export default function PokemonSearchPage() {
  return <SearchView />;
}
