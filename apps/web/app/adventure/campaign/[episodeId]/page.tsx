import { EpisodeOverview } from "@repo/adventure/EpisodeOverview";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{
    episodeId: string;
  }>;
}

export const metadata: Metadata = {
  title: "Episode Overview - Manage Your Story Episode | TiledEx",
  description: "Manage your Pokémon story episode details and progression. Track your narrative development.",
  keywords: "Pokémon episode, story progression, narrative management, episode details",
  openGraph: {
    title: "Episode Overview - Manage Your Story Episode | TiledEx",
    description: "Manage your Pokémon story episode details and progression. Track your narrative development.",
    type: "website",
    images: [
      {
        url: "/images/brand/hero-1200.png",
        width: 1200,
        height: 630,
        alt: "TiledEx Episode Overview - Manage Your Story Episode"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Episode Overview - Manage Your Story Episode | TiledEx",
    description: "Manage your Pokémon story episode details and progression. Track your narrative development.",
    images: ["/images/brand/hero-1200.png"]
  }
};

export default async function Page({ params }: PageProps) {
  const { episodeId } = await params;
  return <EpisodeOverview episodeId={episodeId} />;
}

export async function generateStaticParams() {
  return [
    { episodeId: "episode-1" }
  ];
} 