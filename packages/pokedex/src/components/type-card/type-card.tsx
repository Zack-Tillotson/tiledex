import React from "react";
import styles from "./type-card.module.css";
import { Card } from "@repo/ui";
import { getPokemonTypeColor } from "@repo/types";

export interface TypeCardProps {
  type: string;
  count: number;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function TypeCard({
  type,
  count,
  className = "",
  onClick,
  href,
}: TypeCardProps): React.ReactElement {
  return (
    <Card
      className={className}
      onClick={onClick}
      href={href}
      style={{ backgroundColor: getPokemonTypeColor(type) }}
    >
      <div className={styles.content}>
        <h2 className={styles.typeName}>{type}</h2>
        <div className={styles.count}>{count} Pokémon</div>
      </div>
    </Card>
  );
}

export default TypeCard;
