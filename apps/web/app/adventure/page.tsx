import { Dashboard } from "@repo/adventure/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adventure Dashboard - Manage Your Pokémon Story | TiledEx",
  description: "Manage your Pokémon adventure, party members, and campaigns. Create and organize your story episodes.",
  keywords: "Pokémon adventure, story management, party management, campaign management, episode tracking",
  openGraph: {
    title: "Adventure Dashboard - Manage Your Pokémon Story | TiledEx",
    description: "Manage your Pokémon adventure, party members, and campaigns. Create and organize your story episodes.",
    type: "website",
    images: [
      {
        url: "/images/brand/hero-1200.png",
        width: 1200,
        height: 630,
        alt: "TiledEx Adventure Dashboard - Manage Your Pokémon Story"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Adventure Dashboard - Manage Your Pokémon Story | TiledEx",
    description: "Manage your Pokémon adventure, party members, and campaigns. Create and organize your story episodes.",
    images: ["/images/brand/hero-1200.png"]
  }
};

export default function Page() {
  return <Dashboard />;
} 