"use client";

import React from "react";
import styles from "./pokemon-type.module.css";
import { PokemonCard } from "../pokemon-card";
import {
  PokemonTypeData,
  PokemonTypeProps,
  getPokemonTypeColor,
} from "@repo/types";
import { Link } from "@repo/ui";
import { validatePokemonType, validatePokemonTypes } from "./type-validation";
import Image from "next/image";

export function PokemonType({
  typeData,
  className = "",
}: PokemonTypeProps): React.ReactElement {
  const { name, pokemon, typeInfo } = typeData;

  // Validate the main type name
  const validatedType = validatePokemonType(name);
  const backgroundColor = getPokemonTypeColor(validatedType);

  // Validate pokemon types
  pokemon.forEach((poke) => {
    try {
      validatePokemonTypes(poke.types);
    } catch (error) {
      console.error(`Invalid type in pokemon ${poke.name}:`, error);
    }
  });

  // Validate type effectiveness data if present
  try {
    validatePokemonTypes(typeInfo?.superEffectiveAgainst ?? []);
    validatePokemonTypes(typeInfo?.notVeryEffectiveAgainst ?? []);
    validatePokemonTypes(typeInfo?.noEffectAgainst ?? []);
    validatePokemonTypes(typeInfo?.weakTo ?? []);
    validatePokemonTypes(typeInfo?.resistantTo ?? []);
    validatePokemonTypes(typeInfo?.immuneTo ?? []);
  } catch (error) {
    console.error(`Invalid type in type effectiveness data:`, error);
  }

  const TypeBadge = ({ type }: { type: string }) => {
    const validType = validatePokemonType(type);
    return (
      <span
        className={styles.typeBadge}
        style={{
          backgroundColor: getPokemonTypeColor(validType),
        }}
      >
        <Image
          src={`/images/types/${validType.toLowerCase()}.svg`}
          alt={`${validType} type icon`}
          width={16}
          height={16}
          className={styles.typeIcon}
        />
        {validType}
      </span>
    );
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.typeHeader} style={{ backgroundColor }}>
        <div className={styles.typeTitle}>
          <Image
            src={`/images/types/${validatedType.toLowerCase()}.svg`}
            alt={`${validatedType} type icon`}
            width={48}
            height={48}
            className={styles.typeIcon}
          />
          <h1 className={styles.typeName}>{validatedType}</h1>
        </div>
        <div className={styles.pokemonCount}>{pokemon.length} Pokémon</div>
      </div>

      {typeInfo && (
        <div className={styles.typeEffectiveness}>
          <h2 className={styles.sectionTitle}>Type Effectiveness</h2>

          <div className={styles.effectivenessGrid}>
            {/* Offensive matchups */}
            <div className={styles.effectivenessCard}>
              <h3 className={styles.effectivenessTitle}>
                <span className={styles.typePill} style={{ backgroundColor }}>
                  <Image
                    src={`/images/types/${validatedType.toLowerCase()}.svg`}
                    alt={`${validatedType} type icon`}
                    width={20}
                    height={20}
                    className={styles.typeIcon}
                  />
                  {validatedType}
                </span>{" "}
                Attacks
              </h3>

              {typeInfo.superEffectiveAgainst.length > 0 && (
                <div className={styles.effectivenessSection}>
                  <h4 className={styles.effectivenessSubtitle}>
                    Super Effective Against:
                  </h4>
                  <div className={styles.typeList}>
                    {typeInfo.superEffectiveAgainst.map((type) => (
                      <TypeBadge key={type} type={type} />
                    ))}
                  </div>
                </div>
              )}

              {typeInfo.notVeryEffectiveAgainst.length > 0 && (
                <div className={styles.effectivenessSection}>
                  <h4 className={styles.effectivenessSubtitle}>
                    Not Very Effective Against:
                  </h4>
                  <div className={styles.typeList}>
                    {typeInfo.notVeryEffectiveAgainst.map((type) => (
                      <TypeBadge key={type} type={type} />
                    ))}
                  </div>
                </div>
              )}

              {typeInfo.noEffectAgainst.length > 0 && (
                <div className={styles.effectivenessSection}>
                  <h4 className={styles.effectivenessSubtitle}>
                    No Effect Against:
                  </h4>
                  <div className={styles.typeList}>
                    {typeInfo.noEffectAgainst.map((type) => (
                      <TypeBadge key={type} type={type} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Defensive matchups */}
            <div className={styles.effectivenessCard}>
              <h3 className={styles.effectivenessTitle}>
                <span className={styles.typePill} style={{ backgroundColor }}>
                  <Image
                    src={`/images/types/${validatedType.toLowerCase()}.svg`}
                    alt={`${validatedType} type icon`}
                    width={20}
                    height={20}
                    className={styles.typeIcon}
                  />
                  {validatedType}
                </span>{" "}
                Being Attacked
              </h3>

              {typeInfo.weakTo.length > 0 && (
                <div className={styles.effectivenessSection}>
                  <h4 className={styles.effectivenessSubtitle}>Weak To:</h4>
                  <div className={styles.typeList}>
                    {typeInfo.weakTo.map((type) => (
                      <TypeBadge key={type} type={type} />
                    ))}
                  </div>
                </div>
              )}

              {typeInfo.resistantTo.length > 0 && (
                <div className={styles.effectivenessSection}>
                  <h4 className={styles.effectivenessSubtitle}>
                    Resistant To:
                  </h4>
                  <div className={styles.typeList}>
                    {typeInfo.resistantTo.map((type) => (
                      <TypeBadge key={type} type={type} />
                    ))}
                  </div>
                </div>
              )}

              {typeInfo.immuneTo.length > 0 && (
                <div className={styles.effectivenessSection}>
                  <h4 className={styles.effectivenessSubtitle}>Immune To:</h4>
                  <div className={styles.typeList}>
                    {typeInfo.immuneTo.map((type) => (
                      <TypeBadge key={type} type={type} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <h2 className={styles.sectionTitle}>Pokémon with {validatedType} type</h2>
      <div className={styles.pokemonGrid}>
        {pokemon.map((poke: PokemonTypeData["pokemon"][number]) => (
          <PokemonCard
            key={poke.id}
            pokemon={{
              ...poke,
              types: validatePokemonTypes(poke.types),
            }}
            href={`/pokedex/pokemon/${poke.id}`}
          />
        ))}
      </div>
    </div>
  );
}

export default PokemonType;
