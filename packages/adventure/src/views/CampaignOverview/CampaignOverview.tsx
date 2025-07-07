"use client";

import React from "react";
import styles from "./CampaignOverview.module.css";
import { Header, Link } from "@repo/ui";

/**
 * CampaignOverview view for managing campaigns
 * Displays campaign list and episode navigation
 */
export function CampaignOverview() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <picture>
            <source
              srcSet="/images/brand/campaign2.png"
              sizes="100vw"
            />
            <img
              src="/images/brand/campaign2.png"
              alt="Pokémon Campaign - Story map and adventure planning"
              className="w-full h-full object-cover"
            />
          </picture>
        </div>
      </section>

      <Header level={1} className={styles.heading}>
        Campaign Overview
      </Header>

      <div className={styles.navigation}>
        <Link
          variant="outline"
          size="large"
          href="/adventure"
          className={styles.backButtonLink}
        >
          Back to Dashboard
        </Link>
      </div>

      <div className={styles.content}>
        <p>Manage your campaigns and episodes here.</p>
        <div className={styles.placeholder}>
          <p>Campaign management features coming soon...</p>
          <div className={styles.episodeExample}>
            <p>Example episode: <Link href="/adventure/campaign/episode-1">Episode 1</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignOverview; 