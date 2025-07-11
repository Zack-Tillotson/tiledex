import React from "react";
import { Party } from "../types/party.js";
import styles from "./PartyList.module.css";

interface PartyListProps {
  party: Party;
}

/**
 * PartyList component displays a minimalistic list of party members and their Pokémon
 * @param party - The roster data containing party members and their Pokémon
 */
export function PartyList({ party }: PartyListProps) {
  return (
    <div className={styles.container}>
      <div className={styles.partyGrid}>
        {party.map((member) => (
          <div key={member.id} className={styles.memberCard}>
            <div className={styles.memberHeader}>
              <div className={styles.avatarContainer}>
                <img
                  src={member.avatar}
                  alt={`${member.name}'s avatar`}
                  className={styles.avatar}
                />
              </div>
              <h3 className={styles.memberName}>{member.name}</h3>
            </div>
            
            <div className={styles.pokemonList}>
              <h4 className={styles.pokemonTitle}>Pokémon ({member.roster.length})</h4>
              {member.roster.length > 0 ? (
                <div className={styles.pokemonGrid}>
                  {member.roster.map((pokemon, index) => (
                    <div key={index} className={styles.pokemonItem}>
                      <div className={styles.pokemonSprite}>
                        <img
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.dexId}.png`}
                          alt={`Pokémon #${pokemon.dexId}`}
                          className={styles.sprite}
                        />
                      </div>
                      <div className={styles.pokemonInfo}>
                        <span className={styles.nickname}>{pokemon.nickname}</span>
                        <span className={styles.dexId}>#{pokemon.dexId}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.noPokemon}>No Pokémon caught yet</p>
              )}
            </div>

            {member.goals.length > 0 && (
              <div className={styles.goalsSection}>
                <h4 className={styles.goalsTitle}>Goals ({member.goals.filter(g => g.completed).length}/{member.goals.length})</h4>
                <div className={styles.goalsList}>
                  {member.goals.map((goal, index) => (
                    <div key={index} className={`${styles.goal} ${goal.completed ? styles.completed : ''}`}>
                      <span className={styles.goalText}>{goal.description}</span>
                      <span className={styles.goalStatus}>
                        {goal.completed ? '✓' : '○'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PartyList; 