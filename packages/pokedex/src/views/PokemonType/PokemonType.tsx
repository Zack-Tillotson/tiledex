import React from "react";
import Link from "next/link";
import { PokemonType as PokemonTypeComponent } from "../../components/pokemon-type";
import { getPokemonByType, getTypeByName } from "@repo/pokeapi";
import { Header, Text, Button } from "@repo/ui";
import { PokemonTypeData } from "@repo/types";
import {
  validatePokemonType,
  validatePokemonTypes,
} from "../../components/pokemon-type/type-validation";
import styles from "./PokemonType.module.css";

interface PokemonTypeProps {
  typeId: string;
}

async function getTypeData(typeId: string): Promise<PokemonTypeData | null> {
  try {
    // Validate and normalize the type ID
    const validatedType = validatePokemonType(typeId);

    // Get all Pokemon of this type
    const pokemonOfType = getPokemonByType(validatedType).map((poke) => ({
      ...poke,
      types: validatePokemonTypes(poke.types),
    }));

    if (pokemonOfType.length === 0) {
      return null;
    }

    // Get type effectiveness data
    const typeInfo = getTypeByName(validatedType);

    return {
      name: validatedType,
      pokemon: pokemonOfType,
      typeInfo: typeInfo
        ? {
            superEffectiveAgainst: validatePokemonTypes(
              typeInfo.superEffectiveAgainst,
            ),
            notVeryEffectiveAgainst: validatePokemonTypes(
              typeInfo.notVeryEffectiveAgainst,
            ),
            noEffectAgainst: validatePokemonTypes(typeInfo.noEffectAgainst),
            weakTo: validatePokemonTypes(typeInfo.weakTo),
            resistantTo: validatePokemonTypes(typeInfo.resistantTo),
            immuneTo: validatePokemonTypes(typeInfo.immuneTo),
          }
        : undefined,
    };
  } catch (err) {
    console.error("Error fetching type data:", err);
    return null;
  }
}

export async function PokemonType({ typeId }: PokemonTypeProps) {
  const typeData = await getTypeData(typeId);

  if (!typeData) {
    return (
      <div className={styles.errorContainer}>
        <Header level={2}>Error</Header>
        <Text variant="body" className={styles.errorText}>
          {`No Pokémon found with type: ${typeId}`}
        </Text>
        <Link href="/types" className={styles.backLink}>
          <Button variant="primary">Back to Types</Button>
        </Link>
      </div>
    );
  }

  return <PokemonTypeComponent typeData={typeData} />;
}

export default PokemonType;
