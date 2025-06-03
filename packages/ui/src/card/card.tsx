import { type JSX } from "react";
import cardStyles from "./card.module.css";

/**
 * Card component for containing content with consistent padding and elevation
 * @param className - Additional CSS class to apply to the card
 * @param children - Content to render inside the card
 * @param onClick - Optional click handler for interactive cards
 * @param linkComponent - Optional component to render the card as a link
 * @param href - URL for the link when using linkComponent
 * @param style - Optional inline styles
 */
interface CardProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  linkComponent?: React.ComponentType<any>;
  href?: string;
  style?: React.CSSProperties;
}

const styles = cardStyles as {
  card: string;
  interactive: string;
  link: string;
};

export function Card({
  className = "",
  children,
  onClick,
  linkComponent: LinkComponent,
  href,
  style,
}: CardProps): JSX.Element {
  const isInteractive = Boolean(onClick || (LinkComponent && href));
  const baseClassName = `${styles.card} ${isInteractive ? styles.interactive : ""} ${className}`.trim();

  const cardContent = (
    <div
      className={baseClassName}
      onClick={onClick}
      style={style}
      role={onClick ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={
        onClick ? (e) => e.key === "Enter" && onClick() : undefined
      }
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

export default Card;
