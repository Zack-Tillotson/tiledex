import { Metadata } from 'next';
import styles from "./page.module.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'TiledEx - Create Your Pokémon Story',
  description: 'Craft your own Pokémon adventure with TiledEx. Build your roster, research Pokémon, and bring your story to life in the Pokémon world.',
  keywords: 'Pokémon, storytelling, world building, roster management, Pokémon research, creative writing, Pokémon adventure',
  openGraph: {
    title: 'TiledEx - Create Your Pokémon Story',
    description: 'Craft your own Pokémon adventure with TiledEx. Build your roster, research Pokémon, and bring your story to life in the Pokémon world.',
    type: 'website',
    images: [
      {
        url: '/images/brand/hero-1200.png',
        width: 1200,
        height: 630,
        alt: 'TiledEx - Your Pokémon Storytelling Companion'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TiledEx - Create Your Pokémon Story',
    description: 'Craft your own Pokémon adventure with TiledEx. Build your roster, research Pokémon, and bring your story to life in the Pokémon world.',
    images: ['/images/brand/hero-1200.png']
  }
};

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <picture>
            <source
              srcSet="/images/brand/hero-2000.png 2000w, /images/brand/hero-1200.png 1200w, /images/brand/hero-600.png 600w"
              sizes="100vw"
            />
            <img
              src="/images/brand/hero.png"
              alt="TiledEx Hero"
              className="w-full h-full object-cover"
            />
          </picture>
        </div>
      </section>

      <div className={styles.cardGrid}>
        <Link href="/pokedex" className={styles.card}>
          <div className={styles.cardContent}>
            <h2 className={styles.cardTitle}>Pokedex</h2>
            <div className={styles.pokeball}></div>
            <p className={styles.cardDescription}>
              Research Pokémon species and their characteristics to enrich your story
            </p>
          </div>
        </Link>

        {/* More cards can be added here in the future */}
      </div>
    </div>
  );
}
