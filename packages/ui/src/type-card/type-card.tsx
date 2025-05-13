import React from "react";
import styles from "./type-card.module.css";

// Type color mapping
const typeColors: Record<string, string> = {
  'normal': "#A8A878",
  'fire': "#F08030",
  'water': "#6890F0",
  'electric': "#F8D030",
  'grass': "#78C850",
  'ice': "#98D8D8",
  'fighting': "#C03028",
  'poison': "#A040A0",
  'ground': "#E0C068",
  'flying': "#A890F0",
  'psychic': "#F85888",
  'bug': "#A8B820",
  'rock': "#B8A038",
  'ghost': "#705898",
  'dragon': "#7038F8",
  'dark': "#705848",
  'steel': "#B8B8D0",
  'fairy': "#EE99AC"
};

export interface TypeCardProps {
  type: string;
  count: number;
  className?: string;
  onClick?: () => void;
  linkComponent?: React.ComponentType<any>;
  href?: string;
}

export function TypeCard({ 
  type, 
  count, 
  className = "", 
  onClick, 
  linkComponent: LinkComponent,
  href 
}: TypeCardProps): React.ReactElement {
  const backgroundColor = typeColors[type] || "#777";
  const cardContent = (
    <div 
      className={`${styles.card} ${className}`} 
      style={{ backgroundColor }}
      onClick={onClick}
    >
      <h2 className={styles.typeName}>{type}</h2>
      <div className={styles.count}>{count} Pokémon</div>
    </div>
  );

  if (LinkComponent && href) {
    return (
      <LinkComponent href={href} className={styles.link}>
        {cardContent}
      </LinkComponent>
    );
  }

  return cardContent;
}

export default TypeCard;
