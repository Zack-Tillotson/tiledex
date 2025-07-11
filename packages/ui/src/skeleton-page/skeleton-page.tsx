import React from "react";
import { SkeletonLoader } from "../skeleton/skeleton";
import styles from "./skeleton-page.module.css";

interface SkeletonPageProps {
  className?: string;
  heroHeight?: string | number;
  titleWidth?: string | number;
  titleHeight?: string | number;
  contentLines?: number;
  contentWidth?: string | number;
  contentSpacing?: string | number;
}

/**
 * SkeletonPage component for displaying a generic page loading skeleton
 * @param className - Additional CSS classes
 * @param heroHeight - Height of the hero image skeleton
 * @param titleWidth - Width of the title skeleton
 * @param titleHeight - Height of the title skeleton
 * @param contentLines - Number of content lines to display
 * @param contentWidth - Width of the content skeleton
 * @param contentSpacing - Spacing between content lines
 */
export function SkeletonPage({
  className = "",
  heroHeight = "300px",
  titleWidth = "200px",
  titleHeight = "32px",
  contentLines = 3,
  contentWidth = "100%",
  contentSpacing = "12px",
}: SkeletonPageProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <SkeletonLoader width="100%" height={heroHeight} />
        </div>
      </section>

      <SkeletonLoader 
        width={titleWidth} 
        height={titleHeight} 
        className={styles.heading} 
      />

      <div className={styles.contentSkeleton}>
        <SkeletonLoader 
          variant="text" 
          lines={contentLines} 
          width={contentWidth} 
          height="16px" 
          spacing={contentSpacing} 
        />
        <SkeletonLoader 
          variant="text" 
          lines={Math.max(1, contentLines - 1)} 
          width={`${Math.min(80, 100 - contentLines * 10)}%`} 
          height="16px" 
          spacing={contentSpacing} 
        />
        <SkeletonLoader 
          variant="text" 
          lines={1} 
          width={`${Math.min(60, 100 - contentLines * 15)}%`} 
          height="16px" 
        />
      </div>
    </div>
  );
} 