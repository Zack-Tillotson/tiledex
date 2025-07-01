import { PartyOverview } from "@repo/adventure/PartyOverview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Party Overview - Manage Your Team | TiledEx",
  description: "Manage your party members and their Pokémon. Organize your team for your Pokémon adventure.",
  keywords: "Pokémon party, team management, party members, adventure team",
  openGraph: {
    title: "Party Overview - Manage Your Team | TiledEx",
    description: "Manage your party members and their Pokémon. Organize your team for your Pokémon adventure.",
    type: "website",
    images: [
      {
        url: "/images/brand/hero-1200.png",
        width: 1200,
        height: 630,
        alt: "TiledEx Party Overview - Manage Your Team"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Party Overview - Manage Your Team | TiledEx",
    description: "Manage your party members and their Pokémon. Organize your team for your Pokémon adventure.",
    images: ["/images/brand/hero-1200.png"]
  }
};

export default function Page() {
  return <PartyOverview />;
} 