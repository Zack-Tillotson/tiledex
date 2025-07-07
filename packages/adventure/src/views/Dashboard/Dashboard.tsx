"use client";

import React from "react";
import styles from "./Dashboard.module.css";
import { Header, Link } from "@repo/ui";

/**
 * Dashboard view for the adventure section
 * Displays an overview of adventures and quick navigation
 */
export function Dashboard() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <picture>
            <source
              srcSet="/images/brand/adventure1.png"
              sizes="100vw"
            />
            <img
              src="/images/brand/adventure1.png"
              alt="Pokémon Adventure - Brothers with Pokémon running towards a forest"
              className="w-full h-full object-cover"
            />
          </picture>
        </div>
      </section>

      <Header level={1} className={styles.heading}>
        Adventure Dashboard
      </Header>

      <div className={styles.navigation}>
        <Link
          variant="outline"
          size="large"
          href="/adventure/party"
          className={styles.partyButtonLink}
        >
          Party Overview
        </Link>

        <Link
          variant="outline"
          size="large"
          href="/adventure/campaign"
          className={styles.campaignButtonLink}
        >
          Campaign Overview
        </Link>
      </div>

      <div className={styles.content}>
        <p>Welcome to your adventure dashboard! Manage your party and campaigns here.</p>
      </div>
    </div>
  );
}

export default Dashboard; 