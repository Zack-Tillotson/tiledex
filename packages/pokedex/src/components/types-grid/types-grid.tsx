import React from "react";
import styles from "./types-grid.module.css";
import { TypeCard } from "../type-card";

export interface TypeInfo {
  name: string;
  count: number;
}

interface TypesGridProps {
  types: TypeInfo[];
  className?: string;
  getTypeHref?: (type: string) => string;
}

export function TypesGrid({
  types,
  className = "",
  getTypeHref,
}: TypesGridProps): React.ReactElement {
  return (
    <div className={`${styles.grid} ${className}`}>
      {types.map((type) => (
        <div key={type.name} className={styles.gridItem}>
          <TypeCard
            type={type.name}
            count={type.count}
            href={getTypeHref ? getTypeHref(type.name) : undefined}
          />
        </div>
      ))}
    </div>
  );
}

export default TypesGrid; 