import React from "react";
import styles from "./pokemon-detail.module.css";
import { PokemonEvolution } from "../pokemon-evolution";
import { getPokemonTypeColor } from "@repo/types";
import Image from "next/image";
import { getTypeByName } from "@repo/pokeapi";

// Define Pokemon interfaces locally to avoid import issues
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

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  height: number;
  weight: number;
  species: string;
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  sprites: {
    front_default: string;
    official_artwork?: string;
  };
  evolution?: EvolutionNode[];
}

interface PokemonDetailProps {
  pokemon: Pokemon;
  pokemonData?: Pokemon[];
  className?: string;
  renderTypeLink?: (type: string, children: React.ReactNode) => React.ReactNode;
  renderPokemonLink?: (pokemonName: string, children: React.ReactNode) => React.ReactNode;
  renderAbilityLink?: (ability: string, children: React.ReactNode) => React.ReactNode;
}

// Helper function to calculate combined type effectiveness
function calculateTypeDefenses(types: string[]) {
  const typeData = types.map(type => getTypeByName(type));
  const superEffective: string[] = [];
  const notVeryEffective: string[] = [];
  const noEffect: string[] = [];

  // For each attacking type
  const allTypes = ["normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"];
  
  allTypes.forEach(attackingType => {
    let effectiveness = 1;
    
    // Check each of the Pokémon's types
    typeData.forEach(type => {
      if (!type) return;
      
      if (type.weakTo.includes(attackingType)) {
        effectiveness *= 2;
      } else if (type.resistantTo.includes(attackingType)) {
        effectiveness *= 0.5;
      } else if (type.immuneTo.includes(attackingType)) {
        effectiveness = 0;
      }
    });

    if (effectiveness === 0) {
      noEffect.push(attackingType);
    } else if (effectiveness >= 2) {
      superEffective.push(attackingType);
    } else if (effectiveness <= 0.5) {
      notVeryEffective.push(attackingType);
    }
  });

  return {
    superEffective,
    notVeryEffective,
    noEffect
  };
}

export function PokemonDetail({
  pokemon,
  pokemonData = [],
  className = "",
  renderTypeLink,
  renderPokemonLink,
  renderAbilityLink,
}: PokemonDetailProps): React.ReactElement {
  const typeDefenses = calculateTypeDefenses(pokemon.types);

  return (
    <div className={`${styles.container} ${className}`}>
      {/* Overview Section */}
      <section className={styles.section}>
        <div className={styles.overviewContainer}>
          <div className={styles.headerInfo}>
            <div className={styles.nameRow}>
              <span className={styles.pokemonNumber}>
                #{pokemon.id.toString().padStart(3, "0")}
              </span>
              <h2 className={styles.pokemonName}>{pokemon.name}</h2>
            </div>
            <div className={styles.typesList}>
              {pokemon.types.map((type: string) => {
                const typeBadge = (
                  <span
                    className={styles.typeBadge}
                    style={{ backgroundColor: getPokemonTypeColor(type) }}
                  >
                    <Image
                      src={`/images/types/${type.toLowerCase()}.svg`}
                      alt={`${type} type icon`}
                      width={16}
                      height={16}
                      className={styles.typeIcon}
                    />
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
                  <img
                    src={pokemon.sprites.official_artwork}
                    alt={`${pokemon.name} official artwork`}
                    width={200}
                    height={200}
                    className={styles.image}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Evolution Section */}
      {pokemon.evolution && pokemon.evolution.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Evolution</h2>
          <PokemonEvolution
            evolution={pokemon.evolution}
            currentPokemonName={pokemon.name}
            pokemonData={pokemonData}
            renderPokemonLink={renderPokemonLink}
          />
        </section>
      )}

      {/* Type Defenses Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Type Defenses</h2>
        <div className={styles.typeDefensesGrid}>
          {typeDefenses.superEffective.length > 0 && (
            <div className={styles.typeDefenseCard}>
              <h3 className={styles.typeDefenseTitle}>Weak To</h3>
              <div className={styles.typeList}>
                {typeDefenses.superEffective.map((type) => (
                  <span
                    key={type}
                    className={styles.typeBadge}
                    style={{ backgroundColor: getPokemonTypeColor(type) }}
                  >
                    <Image
                      src={`/images/types/${type.toLowerCase()}.svg`}
                      alt={`${type} type icon`}
                      width={16}
                      height={16}
                      className={styles.typeIcon}
                    />
                    {type}
                  </span>
                ))}
              </div>
            </div>
          )}

          {typeDefenses.notVeryEffective.length > 0 && (
            <div className={styles.typeDefenseCard}>
              <h3 className={styles.typeDefenseTitle}>Resistant To</h3>
              <div className={styles.typeList}>
                {typeDefenses.notVeryEffective.map((type) => (
                  <span
                    key={type}
                    className={styles.typeBadge}
                    style={{ backgroundColor: getPokemonTypeColor(type) }}
                  >
                    <Image
                      src={`/images/types/${type.toLowerCase()}.svg`}
                      alt={`${type} type icon`}
                      width={16}
                      height={16}
                      className={styles.typeIcon}
                    />
                    {type}
                  </span>
                ))}
              </div>
            </div>
          )}

          {typeDefenses.noEffect.length > 0 && (
            <div className={styles.typeDefenseCard}>
              <h3 className={styles.typeDefenseTitle}>Immune To</h3>
              <div className={styles.typeList}>
                {typeDefenses.noEffect.map((type) => (
                  <span
                    key={type}
                    className={styles.typeBadge}
                    style={{ backgroundColor: getPokemonTypeColor(type) }}
                  >
                    <Image
                      src={`/images/types/${type.toLowerCase()}.svg`}
                      alt={`${type} type icon`}
                      width={16}
                      height={16}
                      className={styles.typeIcon}
                    />
                    {type}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Stats</h2>
        <div className={styles.statsSection}>
          <div className={styles.statsGrid}>
            <div className={`${styles.statItem} ${styles.totalStat}`}>
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
            <div className={styles.statSeparator}></div>
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
                {pokemon.abilities.map((ability: PokemonAbility) => {
                  const abilityElement = (
                    <span key={ability.name} className={styles.abilityItem}>
                      {ability.name}
                      {ability.is_hidden && (
                        <span className={styles.hiddenBadge}>(Hidden)</span>
                      )}
                    </span>
                  );

                  return renderAbilityLink ? (
                    <React.Fragment key={ability.name}>
                      {renderAbilityLink(ability.name, abilityElement)}
                    </React.Fragment>
                  ) : (
                    abilityElement
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
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
