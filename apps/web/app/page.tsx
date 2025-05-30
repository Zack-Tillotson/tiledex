import styles from "./page.module.css";
import Link from "next/link";

// This page is static by default in Next.js App Router
// We don't need to add any special functions for the home page

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the Pokédex</h1>
      <p className={styles.description}>
        Explore information about various Pokémon species from all generations
      </p>

      <div className={styles.cardGrid}>
        <Link href="/pokedex" className={styles.card}>
          <div className={styles.cardContent}>
            <h2 className={styles.cardTitle}>Pokédex</h2>
            <p className={styles.cardDescription}>
              Browse through all Pokémon species with detailed information
            </p>
            <div className={styles.cardIcon}>
              <div className={styles.pokeball}></div>
            </div>
          </div>
        </Link>

        {/* More cards can be added here in the future */}
      </div>
    </div>
  );
}
