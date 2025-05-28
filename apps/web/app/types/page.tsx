import { TypesView } from "../../views/TypesView/TypesView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pokémon Types | Pokédex",
  description:
    "Explore Pokémon by their types. Each type has unique characteristics and strengths.",
};

// Force static rendering for this page
export const dynamic = "force-static";

export default function TypesPage() {
  return <TypesView />;
}
