import { type Pokemon } from "@repo/types";
import { PokemonCard } from "@repo/ui/pokemon-card";

import styles from "./pokemon-grid.module.css";
import { Link } from "../link-button/Link";

interface PokemonGridProps {
  pokemon: Pokemon[];
}

export function PokemonGrid({ pokemon }: PokemonGridProps) {
  return (
    <div className={styles.grid}>
      {pokemon.length > 0 ? (
        pokemon.map((poke: Pokemon) => (
          <PokemonCard
            key={poke.id}
            pokemon={poke}
            href={`/pokedex/pokemon/${poke.id}`}
            linkComponent={Link}
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
