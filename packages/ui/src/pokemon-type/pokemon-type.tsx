import React from "react";
import styles from "./pokemon-type.module.css";
import { PokemonCard } from "../pokemon-card/pokemon-card";

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

export interface PokemonTypeData {
  name: string;
  pokemon: Array<{
    id: number;
    name: string;
    types: string[];
    sprites: {
      front_default: string;
      official_artwork?: string;
    };
    height: number;
    weight: number;
  }>;
  // Type effectiveness data
  typeInfo?: {
    superEffectiveAgainst: string[];
    notVeryEffectiveAgainst: string[];
    noEffectAgainst: string[];
    weakTo: string[];
    resistantTo: string[];
    immuneTo: string[];
  };
}

interface PokemonTypeProps {
  typeData: PokemonTypeData;
  className?: string;
}

export function PokemonType({ typeData, className = "" }: PokemonTypeProps): React.ReactElement {
  const { name, pokemon, typeInfo } = typeData;
  const backgroundColor = typeColors[name] || "#777";
  
  return (
    <div className={`${styles.container} ${className}`}>
      <div 
        className={styles.typeHeader} 
        style={{ backgroundColor }}
      >
        <h1 className={styles.typeName}>{name}</h1>
        <div className={styles.pokemonCount}>
          {pokemon.length} Pokémon
        </div>
      </div>
      
      <div className={styles.description}>
        <p>Pokémon of the {name} type have the following characteristics:</p>
        <ul className={styles.typeCharacteristics}>
          <li>Type color: <span className={styles.colorSwatch} style={{ backgroundColor }}></span></li>
          <li>Common in {getTypeEnvironment(name)} environments</li>
        </ul>
      </div>
      
      {typeInfo && (
        <div className={styles.typeEffectiveness}>
          <h2 className={styles.sectionTitle}>Type Effectiveness</h2>
          
          <div className={styles.effectivenessGrid}>
            {/* Offensive matchups */}
            <div className={styles.effectivenessCard}>
              <h3 className={styles.effectivenessTitle}>
                <span 
                  className={styles.typePill}
                  style={{ backgroundColor }}
                >
                  {name}
                </span> Attacks
              </h3>
              
              {typeInfo.superEffectiveAgainst.length > 0 && (
                <div className={styles.effectivenessSection}>
                  <h4 className={styles.effectivenessSubtitle}>Super Effective Against:</h4>
                  <div className={styles.typeList}>
                    {typeInfo.superEffectiveAgainst.map(type => (
                      <span 
                        key={type} 
                        className={styles.typeBadge}
                        style={{ backgroundColor: typeColors[type] || "#777" }}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {typeInfo.notVeryEffectiveAgainst.length > 0 && (
                <div className={styles.effectivenessSection}>
                  <h4 className={styles.effectivenessSubtitle}>Not Very Effective Against:</h4>
                  <div className={styles.typeList}>
                    {typeInfo.notVeryEffectiveAgainst.map(type => (
                      <span 
                        key={type} 
                        className={styles.typeBadge}
                        style={{ backgroundColor: typeColors[type] || "#777" }}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {typeInfo.noEffectAgainst.length > 0 && (
                <div className={styles.effectivenessSection}>
                  <h4 className={styles.effectivenessSubtitle}>No Effect Against:</h4>
                  <div className={styles.typeList}>
                    {typeInfo.noEffectAgainst.map(type => (
                      <span 
                        key={type} 
                        className={styles.typeBadge}
                        style={{ backgroundColor: typeColors[type] || "#777" }}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Defensive matchups */}
            <div className={styles.effectivenessCard}>
              <h3 className={styles.effectivenessTitle}>
                <span 
                  className={styles.typePill}
                  style={{ backgroundColor }}
                >
                  {name}
                </span> Being Attacked
              </h3>
              
              {typeInfo.weakTo.length > 0 && (
                <div className={styles.effectivenessSection}>
                  <h4 className={styles.effectivenessSubtitle}>Weak To:</h4>
                  <div className={styles.typeList}>
                    {typeInfo.weakTo.map(type => (
                      <span 
                        key={type} 
                        className={styles.typeBadge}
                        style={{ backgroundColor: typeColors[type] || "#777" }}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {typeInfo.resistantTo.length > 0 && (
                <div className={styles.effectivenessSection}>
                  <h4 className={styles.effectivenessSubtitle}>Resistant To:</h4>
                  <div className={styles.typeList}>
                    {typeInfo.resistantTo.map(type => (
                      <span 
                        key={type} 
                        className={styles.typeBadge}
                        style={{ backgroundColor: typeColors[type] || "#777" }}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {typeInfo.immuneTo.length > 0 && (
                <div className={styles.effectivenessSection}>
                  <h4 className={styles.effectivenessSubtitle}>Immune To:</h4>
                  <div className={styles.typeList}>
                    {typeInfo.immuneTo.map(type => (
                      <span 
                        key={type} 
                        className={styles.typeBadge}
                        style={{ backgroundColor: typeColors[type] || "#777" }}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <h2 className={styles.sectionTitle}>Pokémon with {name} type</h2>
      
      <div className={styles.pokemonGrid}>
        {pokemon.map(poke => (
          <PokemonCard 
            key={poke.id} 
            pokemon={poke} 
            linkPath={`/pokedex/pokemon/${poke.id}`} 
          />
        ))}
      </div>
    </div>
  );
}

// Helper function to get environment description based on type
function getTypeEnvironment(type: string): string {
  const environments: Record<string, string> = {
    'normal': 'urban and rural',
    'fire': 'volcanic and arid',
    'water': 'aquatic and coastal',
    'electric': 'industrial and stormy',
    'grass': 'forest and jungle',
    'ice': 'arctic and mountainous',
    'fighting': 'urban and mountainous',
    'poison': 'urban and swamp',
    'ground': 'desert and cave',
    'flying': 'mountainous and forest',
    'psychic': 'urban and mysterious',
    'bug': 'forest and grassland',
    'rock': 'mountainous and cave',
    'ghost': 'ancient and abandoned',
    'dragon': 'mysterious and rare',
    'dark': 'nocturnal and cave',
    'steel': 'industrial and mountainous',
    'fairy': 'enchanted and mysterious'
  };
  
  return environments[type] || 'various';
}

export default PokemonType;
