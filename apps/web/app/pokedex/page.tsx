import { PokedexPage } from "@repo/pokedex/PokedexPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pokédex - Research Pokémon for Your Story | TiledEx",
  description: "Research Pokémon species, their abilities, and characteristics to enrich your Pokémon story. Find the perfect Pokémon for your narrative.",
  keywords: "Pokémon research, Pokédex, Pokémon species, Pokémon abilities, story research, world building",
  openGraph: {
    title: "Pokédex - Research Pokémon for Your Story | TiledEx",
    description: "Research Pokémon species, their abilities, and characteristics to enrich your Pokémon story. Find the perfect Pokémon for your narrative.",
    type: "website",
    images: [
      {
        url: "/images/brand/hero-1200.png",
        width: 1200,
        height: 630,
        alt: "TiledEx Pokédex - Research Pokémon for Your Story"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Pokédex - Research Pokémon for Your Story | TiledEx",
    description: "Research Pokémon species, their abilities, and characteristics to enrich your Pokémon story. Find the perfect Pokémon for your narrative.",
    images: ["/images/brand/hero-1200.png"]
  }
};

export default function Page() {
  return <PokedexPage />;
}
