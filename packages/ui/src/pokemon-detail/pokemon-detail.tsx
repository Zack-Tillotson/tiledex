import React from "react";
import styles from "./pokemon-detail.module.css";
import { PokemonEvolution } from "../pokemon-evolution";
import { getPokemonTypeColor } from "@repo/types";

// Define Pokemon interfaces locally to avoid import issues
// These match the structure in the types package
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
  stats: PokemonStat[];
  height: number;
  weight: number;
  abilities: PokemonAbility[];
  species: string;
  evolution?: EvolutionNode[];
}

interface PokemonStat {
  name: string;
  base_stat: number;
}

interface PokemonAbility {
  name: string;
  is_hidden: boolean;
}

interface EvolutionNode {
  pokemon: string; // Pokemon name
  trigger?: string;
  triggerDetail?: {
    level?: number;
    item?: string;
    happiness?: number;
    timeOfDay?: string;
    [key: string]: string | number | boolean | undefined;
  };
}

// Helper functions removed as they're no longer used in the compact view

interface PokemonDetailProps {
  pokemon: Pokemon;
  pokemonData?: Pokemon[];
  className?: string;
  renderTypeLink?: (type: string, children: React.ReactNode) => React.ReactNode;
  renderPokemonLink?: (
    pokemonName: string,
    children: React.ReactNode,
  ) => React.ReactNode;
}

export function PokemonDetail({
  pokemon,
  pokemonData = [],
  className = "",
  renderTypeLink,
  renderPokemonLink,
}: PokemonDetailProps): React.ReactElement {
  return (
    <div className={`${styles.container} ${className}`}>
      {/* Overview Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Overview</h2>
        <div className={styles.overviewContainer}>
          <div className={styles.headerInfo}>
            <div className={styles.idBadge}>
              #{pokemon.id.toString().padStart(3, "0")}
            </div>
            <h1 className={styles.pokemonName}>{pokemon.name}</h1>

            <div className={styles.typesList}>
              {pokemon.types.map((type: string) => {
                const typeBadge = (
                  <span
                    className={styles.typeBadge}
                    style={{ backgroundColor: getPokemonTypeColor(type) }}
                  >
                    {type}
                  </span>
                );

                return renderTypeLink ? (
                  <React.Fragment key={type}>
                    {renderTypeLink(type, typeBadge)}
                  </React.Fragment>
                ) : (
                  <span key={type} className={styles.typeBadgeWrapper}>
                    {typeBadge}
                  </span>
                );
              })}
            </div>
          </div>

          <div className={styles.imagesSection}>
            <div className={styles.imagesGrid}>
              {pokemon.sprites.official_artwork && (
                <div className={styles.imageContainer}>
                  <h3 className={styles.imageTitle}>Official Artwork</h3>
                  <img
                    src={pokemon.sprites.official_artwork}
                    alt={`${pokemon.name} official artwork`}
                    width={200}
                    height={200}
                    className={styles.image}
                  />
                </div>
              )}
              <div className={styles.spriteRow}>
                {pokemon.sprites.front_default && (
                  <div className={styles.imageContainer}>
                    <h3 className={styles.imageTitle}>Front Default</h3>
                    <img
                      src={pokemon.sprites.front_default}
                      alt={`${pokemon.name} front default`}
                      width={120}
                      height={120}
                      className={styles.image}
                    />
                  </div>
                )}
                {pokemon.sprites.back_default && (
                  <div className={styles.imageContainer}>
                    <h3 className={styles.imageTitle}>Back Default</h3>
                    <img
                      src={pokemon.sprites.back_default}
                      alt={`${pokemon.name} back default`}
                      width={120}
                      height={120}
                      className={styles.image}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Stats</h2>
        <div className={styles.statsSection}>
          <div className={styles.statsGrid}>
            {pokemon.stats.map((stat: PokemonStat) => (
              <div key={stat.name} className={styles.statItem}>
                <h3 className={styles.statName}>{stat.name}</h3>
                <div className={styles.statBarContainer}>
                  <div
                    className={styles.statBar}
                    style={{
                      width: `${Math.min(100, (stat.base_stat / 160) * 100)}%`,
                      backgroundColor: getStatColor(stat.base_stat),
                    }}
                  ></div>
                </div>
                <span className={styles.statValue}>{stat.base_stat}</span>
              </div>
            ))}
            <div className={styles.statSeparator}></div>
            <div className={styles.statItem}>
              <h3 className={styles.statName}>Total</h3>
              <div className={styles.statBarContainer}>
                <div
                  className={styles.statBar}
                  style={{
                    width: `${Math.min(100, (pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0) / 600) * 100)}%`,
                    backgroundColor: getTotalStatColor(
                      pokemon.stats.reduce(
                        (sum, stat) => sum + stat.base_stat,
                        0,
                      ),
                    ),
                  }}
                ></div>
              </div>
              <span className={styles.statValue}>
                {pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Attributes Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Attributes</h2>
        <div className={styles.attributesContainer}>
          <div className={styles.attributeItem}>
            <h3 className={styles.attributeLabel}>Height</h3>
            <p className={styles.attributeValue}>
              {(pokemon.height / 10).toFixed(1)} m
            </p>
          </div>
          <div className={styles.attributeItem}>
            <h3 className={styles.attributeLabel}>Weight</h3>
            <p className={styles.attributeValue}>
              {(pokemon.weight / 10).toFixed(1)} kg
            </p>
          </div>
          <div className={styles.attributeItem}>
            <h3 className={styles.attributeLabel}>Species</h3>
            <p className={styles.attributeValue}>{pokemon.species}</p>
          </div>
          {pokemon.abilities && pokemon.abilities.length > 0 && (
            <div className={styles.attributeItem}>
              <h3 className={styles.attributeLabel}>Abilities</h3>
              <div className={styles.abilitiesList}>
                {pokemon.abilities.map((ability) => (
                  <span key={ability.name} className={styles.abilityTag}>
                    {ability.name}
                    {ability.is_hidden && (
                      <span className={styles.hiddenTag}> (Hidden)</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Evolution Section */}
      {pokemon.evolution && pokemon.evolution.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Evolution Chain</h2>
          <PokemonEvolution
            evolution={pokemon.evolution}
            currentPokemonName={pokemon.name}
            pokemonData={pokemonData.length > 0 ? pokemonData : [pokemon]}
            renderPokemonLink={renderPokemonLink}
          />
        </section>
      )}
    </div>
  );
}

// Helper function to get color based on stat value
function getStatColor(value: number): string {
  if (value < 50) return "#ff7675";
  if (value < 85) return "#fdcb6e";
  if (value < 125) return "#74b9ff";
  return "#00b894";
}

// Helper function to get color for total stats based on thresholds
function getTotalStatColor(totalValue: number): string {
  if (totalValue < 425) return "#ff7675"; // Red for lower total stats
  if (totalValue < 475) return "#fdcb6e"; // Yellow for medium total stats
  if (totalValue < 525) return "#74b9ff"; // Blue for higher total stats
  return "#00b894"; // Green for high total stats
}

export default PokemonDetail;
