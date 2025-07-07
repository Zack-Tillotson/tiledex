"use client";

import React from "react";
import styles from "./EpisodeOverview.module.css";
import { Header, Link } from "@repo/ui";

interface EpisodeOverviewProps {
  episodeId: string;
}

/**
 * EpisodeOverview view for managing individual episodes
 * Displays episode details and story progression
 * @param episodeId - The ID of the episode to display
 */
export function EpisodeOverview({ episodeId }: EpisodeOverviewProps) {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <picture>
            <source
              srcSet="/images/brand/episode1.png"
              sizes="100vw"
            />
            <img
              src="/images/brand/episode1.png"
              alt="Pokémon Episode - Story scene and character development"
              className="w-full h-full object-cover"
            />
          </picture>
        </div>
      </section>

      <Header level={1} className={styles.heading}>
        Episode: {episodeId}
      </Header>

      <div className={styles.navigation}>
        <Link
          variant="outline"
          size="large"
          href="/adventure/campaign"
          className={styles.backButtonLink}
        >
          Back to Campaign
        </Link>
      </div>

      <div className={styles.content}>
        <p>Manage episode details and story progression here.</p>
        <div className={styles.placeholder}>
          <p>Episode management features coming soon...</p>
          <div className={styles.episodeInfo}>
            <p><strong>Episode ID:</strong> {episodeId}</p>
            <p><strong>Status:</strong> In Progress</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EpisodeOverview; 