import React from "react";
import styles from "./shelf.module.css";

interface ShelfProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Shelf component for displaying content in a slide-out panel
 * @param isOpen - Whether the shelf is visible
 * @param onClose - Callback when the shelf should close
 * @param title - Optional title for the shelf header
 * @param children - Content to display in the shelf
 * @param className - Additional CSS classes
 */
export function Shelf({
  isOpen,
  onClose,
  title,
  children,
  className = "",
}: ShelfProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={`${styles.shelf} ${className}`}>
        {title && (
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className={styles.closeButton}
              aria-label="Close shelf"
            >
              ×
            </button>
          </div>
        )}
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </>
  );
} 