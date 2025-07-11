import React from "react";
import styles from "./skeleton.module.css";

interface SkeletonLoaderProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  variant?: "rectangular" | "circular" | "text";
  lines?: number;
  spacing?: string | number;
}

/**
 * SkeletonLoader component for displaying loading placeholders
 * @param width - Width of the skeleton (can be CSS value or number for pixels)
 * @param height - Height of the skeleton (can be CSS value or number for pixels)
 * @param className - Additional CSS classes
 * @param variant - Shape variant: rectangular, circular, or text
 * @param lines - Number of text lines to render (for text variant)
 * @param spacing - Spacing between lines (for text variant)
 */
export function SkeletonLoader({
  width = "100%",
  height = "20px",
  className = "",
  variant = "rectangular",
  lines = 1,
  spacing = "8px",
}: SkeletonLoaderProps) {
  const getWidth = (value: string | number) => {
    return typeof value === "number" ? `${value}px` : value;
  };

  const getHeight = (value: string | number) => {
    return typeof value === "number" ? `${value}px` : value;
  };

  const getSpacing = (value: string | number) => {
    return typeof value === "number" ? `${value}px` : value;
  };

  if (variant === "text" && lines > 1) {
    return (
      <div className={`${styles.skeletonContainer} ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${styles.skeleton} ${styles.text}`}
            style={{
              width: getWidth(width),
              height: getHeight(height),
              marginBottom: index < lines - 1 ? getSpacing(spacing) : 0,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${styles.skeleton} ${styles[variant]} ${className}`}
      style={{
        width: getWidth(width),
        height: getHeight(height),
      }}
    />
  );
} 