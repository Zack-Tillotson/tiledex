import { type JSX } from "react";
import styles from "./card.module.css";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  linkComponent?: React.ComponentType<any>;
  href?: string;
  style?: React.CSSProperties;
}

export function Card({
  className = "",
  children,
  onClick,
  linkComponent: LinkComponent,
  href,
  style,
}: CardProps): JSX.Element {
  const cardContent = (
    <div
      className={`${styles.card} ${className}`}
      onClick={onClick}
      style={style}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
    >
      {children}
    </div>
  );

  if (LinkComponent && href) {
    return (
      <LinkComponent
        href={href}
        className={styles.link}
        variant="inline"
        size="none"
      >
        {cardContent}
      </LinkComponent>
    );
  }

  return cardContent;
}
