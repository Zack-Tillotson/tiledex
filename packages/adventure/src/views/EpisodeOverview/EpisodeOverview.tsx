"use client";

import React from "react";
import styles from "./EpisodeOverview.module.css";
import { Header, Link, SkeletonPage } from "@repo/ui";
import { useClientData } from "../../data/index.js";
import { useSearchParams } from "next/navigation.js";

interface EpisodeOverviewProps {
  episodeId: string;
}

/**
 * EpisodeOverview view for managing individual episodes
 * Displays episode details and story progression
 * @param episodeId - The ID of the episode to display
 */
export function EpisodeOverview({ episodeId }: EpisodeOverviewProps) {
  const searchParams = useSearchParams();
  
  // If the ID is the placeholder value, get it from search parameters
  const actualId = searchParams.get("id") || episodeId;
  const { isLoading, data } = useClientData({ episode: actualId });

  if (isLoading) {
    return <SkeletonPage />;
  }

  const episode = data.episode;

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
        {episode?.title || `Episode: ${episodeId}`}
      </Header>

      <div className={styles.content}>
        {episode ? (
          <div className={styles.episodeInfo}>
            {episode.backgroundStory && (
              <div className={styles.backgroundSection}>
                <Header level={2} className={styles.backgroundTitle}>
                  Background
                </Header>
                <div className={styles.backgroundStory}>
                  {episode.backgroundStory}
                </div>
              </div>
            )}

            {episode.chapters && episode.chapters.length > 0 && (
              <div className={styles.chaptersSection}>
                <Header level={2} className={styles.chaptersTitle}>
                  Chapters
                </Header>
                <div className={styles.chaptersList}>
                  {episode.chapters.map((chapter, index) => (
                    <div key={chapter.id || index} className={styles.chapter}>
                      <div className={styles.chapterHeader}>
                        <Header level={3} className={styles.chapterTitle}>
                          Chapter {index + 1}
                        </Header>
                      </div>
                      
                      <div className={styles.chapterContent}>
                        <div className={styles.question}>
                          <strong>Question:</strong> {chapter.question}
                        </div>
                        
                        {chapter.result ? (
                          <div className={styles.result}>
                            <strong>Result:</strong> {chapter.result}
                          </div>
                        ) : chapter.options && chapter.options.length > 0 ? (
                          <div className={styles.options}>
                            <strong>Options:</strong>
                            <ul className={styles.optionsList}>
                              {chapter.options.map((option, optionIndex) => (
                                <li key={optionIndex} className={styles.option}>
                                  {option}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div className={styles.noChoice}>
                            <em>No choice made yet</em>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {episode.description && (
              <div className={styles.descriptionSection}>
                <Header level={2} className={styles.descriptionTitle}>
                  Episode Description
                </Header>
                <p className={styles.description}>{episode.description}</p>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.noEpisode}>
            <p>Episode not found.</p>
            <div className={styles.placeholder}>
              <p>Episode management features coming soon...</p>
              <div className={styles.episodeInfo}>
                <p><strong>Episode ID:</strong> {episodeId}</p>
                <p><strong>Status:</strong> Not Found</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EpisodeOverview; 