import React from 'react';
import { AbilityDetail } from '../../components/ability-detail/AbilityDetail';
import { getAbilityByName, getPokemonByAbility } from '@repo/pokeapi';
import styles from './AbilityView.module.css';
import Link from 'next/link';

interface AbilityViewProps {
  name: string;
}

export function AbilityView({ name }: AbilityViewProps) {
  const ability = getAbilityByName(name);
  const pokemonWithAbility = getPokemonByAbility(name);

  if (!ability) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h1>Ability Not Found</h1>
          <p>Sorry, we couldn&apos;t find the ability: {name}</p>
          <Link href="/pokedex" className={styles.backLink}>
            Back to Pokedex
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.backLinkContainer}>
        <Link href="/pokedex" className={styles.backLink}>
          &larr; Back to Pokedex
        </Link>
      </div>

      <AbilityDetail
        name={ability.name}
        description={ability.description}
        flavorText={ability.flavor_text}
        pokemon={pokemonWithAbility}
      />
    </div>
  );
} 