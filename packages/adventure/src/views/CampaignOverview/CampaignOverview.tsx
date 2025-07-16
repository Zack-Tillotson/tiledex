"use client";

import React from "react";
import { Header, SkeletonPage, Link } from "@repo/ui";
import { useClientData } from "../../data/index.js";
import styles from "./CampaignOverview.module.css";

export function CampaignOverview() {
  const { isLoading, data } = useClientData({ campaign: true });

  if (isLoading) {
    return <SkeletonPage />;
  }

  const campaign = data.campaign;
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

      <div className={styles.content}>
        {campaign && (
          <div className={styles.campaignInfo}>

            {campaign.objectives && campaign.objectives.length > 0 && (
              <div className={styles.objectivesSection}>
                <Header level={2} className={styles.objectivesTitle}>
                  Objectives
                </Header>
                <div className={styles.objectivesList}>
                  {campaign.objectives.map((objective, index) => (
                    <div key={index} className={`${styles.objective} ${objective.completed ? styles.completed : ''}`}>
                      <span className={styles.objectiveText}>{objective.description}</span>
                      <span className={styles.objectiveStatus}>
                        {objective.completed ? '✓' : '○'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {campaign.episodes && campaign.episodes.length > 0 && (
              <div className={styles.episodesSection}>
                <Header level={2} className={styles.episodesTitle}>
                  Episodes
                </Header>
                <div className={styles.episodesList}>
                  {campaign.episodes.map((episode, index) => {
                    const isLatest = index === (campaign.episodes?.length || 0) - 1;
                    return (
                      <div key={episode.id || index} className={`${styles.episode} ${isLatest ? styles.latestEpisode : ''}`}>
                        <Link
                          href={`/adventure/campaign/-/?id=${index}`}
                          variant={isLatest ? "primary" : "secondary"}
                          className={styles.episodeLink}
                        >
                          {episode.title || `Episode ${index + 1}`}
                          {isLatest && <span className={styles.latestBadge}>Latest</span>}
                        </Link>
                        {episode.description && (
                          <p className={styles.episodeDescription}>{episode.description}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CampaignOverview; 