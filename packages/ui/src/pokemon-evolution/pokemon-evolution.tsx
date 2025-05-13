import React from 'react';
import styles from './pokemon-evolution.module.css';

// Define interfaces locally to avoid import issues
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

// Simplified Pokemon interface with only the properties we need
interface SimplePokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

interface PokemonEvolutionProps {
  evolution: EvolutionNode[];
  currentPokemonName: string;
  pokemonData: SimplePokemon[];
  renderPokemonLink?: (pokemonName: string, children: React.ReactNode) => React.ReactNode;
}

export function PokemonEvolution({ 
  evolution, 
  currentPokemonName,
  pokemonData,
  renderPokemonLink 
}: PokemonEvolutionProps): React.ReactElement {
  
  if (!evolution || evolution.length === 0) {
    return (
      <div className={styles.noEvolution}>
        This Pokémon does not evolve.
      </div>
    );
  }

  // Helper function to find a Pokemon by name in the provided data
  const findPokemonByName = (name: string): SimplePokemon | undefined => {
    return pokemonData.find(p => p.name.toLowerCase() === name.toLowerCase());
  };

  // Format trigger details into readable text
  const formatTriggerDetails = (node: EvolutionNode): string => {
    if (!node.trigger) return '';
    
    let details = '';
    
    switch (node.trigger) {
      case 'level-up':
        if (node.triggerDetail?.level) {
          details = `Level ${node.triggerDetail.level}`;
        } else {
          details = 'Level up';
        }
        
        if (node.triggerDetail?.timeOfDay) {
          details += ` (${node.triggerDetail.timeOfDay})`;
        }
        
        if (node.triggerDetail?.happiness) {
          details += ` with high friendship`;
        }
        break;
        
      case 'trade':
        details = 'Trade';
        if (node.triggerDetail?.item) {
          details += ` holding ${node.triggerDetail.item}`;
        }
        break;
        
      case 'use-item':
        if (node.triggerDetail?.item) {
          details = `Use ${node.triggerDetail.item}`;
        } else {
          details = 'Use item';
        }
        break;
        
      default:
        details = node.trigger;
    }
    
    return details;
  };

  return (
    <div className={styles.evolutionContainer}>
      <div className={styles.evolutionChain}>
        {evolution.map((node, index) => {
          // Get the Pokémon data to display sprite and ID
          const pokemonData = findPokemonByName(node.pokemon);
          
          if (!pokemonData) return null;
          
          const isCurrentPokemon = pokemonData.name.toLowerCase() === currentPokemonName.toLowerCase();
          
          // Create the evolution item element
          const evolutionItem = (
            <div 
              key={pokemonData.id} 
              className={`${styles.evolutionItem} ${isCurrentPokemon ? styles.current : ''}`}
            >
              <img 
                src={pokemonData.sprites.front_default} 
                alt={pokemonData.name} 
                className={styles.evolutionImage}
              />
              <h3 className={styles.evolutionName}>{pokemonData.name}</h3>
              <div className={styles.evolutionId}>#{pokemonData.id.toString().padStart(3, '0')}</div>
            </div>
          );
          
          // Add arrow between evolution stages
          return (
            <React.Fragment key={`evolution-${index}`}>
              {index > 0 && (
                <div className={styles.evolutionArrow}>
                  <div className={styles.arrowIcon}>→</div>
                  <div className={styles.triggerInfo}>
                    {formatTriggerDetails(node)}
                  </div>
                </div>
              )}
              
              {renderPokemonLink ? (
                renderPokemonLink(pokemonData.name, evolutionItem)
              ) : (
                evolutionItem
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default PokemonEvolution;
