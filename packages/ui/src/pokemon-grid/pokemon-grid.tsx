import { 
  type Pokemon
} from '@repo/types';
import { PokemonCard } from '@repo/ui/pokemon-card/pokemon-card';

import styles from "./pokemon-grid.module.css";

interface PokemonGridProps {
  pokemon: Pokemon[],
}

export function PokemonGrid({ pokemon }: PokemonGridProps) {
  return (
    <div className={styles.grid}>
      {pokemon.length > 0 ? (
        pokemon.map((poke: Pokemon) => (
          <PokemonCard 
            key={poke.id} 
            pokemon={poke} 
            linkPath={`/pokedex/pokemon/${poke.id}`}
          />
        ))
      ) : (
        <div className={styles.noResults}>
          <p>No Pokémon found matching your search.</p>
        </div>
      )}
    </div>
  );
}
