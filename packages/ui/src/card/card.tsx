import { type JSX } from "react";
import styles from "./card.module.css";

interface CardProps {
  className?: string;
  imageUrl: string;
  imageAlt: string;
  title: string;
  children: React.ReactNode;
  linkHref?: string;
  linkText?: string;
}

export function Card({
  className = "",
  imageUrl,
  imageAlt,
  title,
  children,
  linkHref,
  linkText,
}: CardProps): JSX.Element {
  return (
    <div 
      className={`${styles.card} ${className}`}
    >
      <div className={styles.imageContainer}>
        <img 
          src={imageUrl} 
          alt={imageAlt} 
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.text}>{children}</div>
        {linkHref && linkText && (
          <div className={styles.linkContainer}>
            <a 
              href={linkHref}
              className={styles.link}
            >
              {linkText}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
