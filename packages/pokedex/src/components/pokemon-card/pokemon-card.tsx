import React from "react";
import styles from "./pokemon-card.module.css";
import { Card } from "@repo/ui";
import { getPokemonTypeColor } from "@repo/types";
import Image from "next/image";

// Define Pokemon interface directly to avoid import issues
interface Pokemon {
  id: number;
  name: string;
  types: string[];
  sprites: {
    front_default: string;
    back_default?: string;
    front_shiny?: string;
    back_shiny?: string;
    official_artwork?: string;
  };
  height: number;
  weight: number;
}

// Helper functions removed as they're no longer used in the compact view

interface PokemonCardProps {
  pokemon: Pokemon;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function PokemonCard({
  pokemon,
  className = "",
  onClick,
  href,
}: PokemonCardProps): React.ReactElement {
  return (
    <Card
      className={className}
      onClick={onClick}
      href={href}
    >
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img
            src={
              pokemon.sprites.official_artwork || pokemon.sprites.front_default
            }
            alt={`${pokemon.name} image`}
            className={styles.image}
          />
        </div>
        <div className={styles.info}>
          <div className={styles.id}>
            #{pokemon.id.toString().padStart(3, "0")}
          </div>
          <h3 className={styles.name}>{pokemon.name}</h3>
          <div className={styles.types}>
            {pokemon.types.map((type) => (
              <span
                key={type}
                className={styles.type}
                style={{ backgroundColor: getPokemonTypeColor(type) }}
              >
                <Image
                  src={`/images/types/${type.toLowerCase()}.svg`}
                  alt={`${type} type icon`}
                  width={12}
                  height={12}
                  className={styles.typeIcon}
                />
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
