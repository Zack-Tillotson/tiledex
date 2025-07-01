import { CampaignOverview } from "@repo/adventure/CampaignOverview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campaign Overview - Manage Your Story | TiledEx",
  description: "Manage your Pokémon campaigns and episodes. Organize your story progression and narrative.",
  keywords: "Pokémon campaign, story management, episode tracking, narrative organization",
  openGraph: {
    title: "Campaign Overview - Manage Your Story | TiledEx",
    description: "Manage your Pokémon campaigns and episodes. Organize your story progression and narrative.",
    type: "website",
    images: [
      {
        url: "/images/brand/hero-1200.png",
        width: 1200,
        height: 630,
        alt: "TiledEx Campaign Overview - Manage Your Story"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Campaign Overview - Manage Your Story | TiledEx",
    description: "Manage your Pokémon campaigns and episodes. Organize your story progression and narrative.",
    images: ["/images/brand/hero-1200.png"]
  }
};

export default function Page() {
  return <CampaignOverview />;
} 