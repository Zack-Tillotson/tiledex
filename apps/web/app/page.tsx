import styles from "./page.module.css";
import Link from "next/link";

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
              src="/images/brand/hero-400.png"
              alt="TiledEx Hero"
              className="w-full h-full object-cover"
            />
          </picture>
        </div>
      </section>

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
