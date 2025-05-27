import { POKEMON_TYPE_COLORS, PokemonTypeKey } from "@repo/types";

const VALID_POKEMON_TYPES = Object.keys(
  POKEMON_TYPE_COLORS,
) as PokemonTypeKey[];

export class InvalidPokemonTypeError extends Error {
  constructor(value: string) {
    super(
      `Invalid Pokemon type: "${value}". Valid types are: ${VALID_POKEMON_TYPES.join(", ")}`,
    );
    this.name = "InvalidPokemonTypeError";
  }
}

/**
 * Validates a Pokemon type string and returns it as a PokemonTypeKey if valid
 * @throws {InvalidPokemonTypeError} if the type is invalid
 */
export function validatePokemonType(type: string): PokemonTypeKey {
  const normalizedType = type.toLowerCase() as PokemonTypeKey;
  if (!VALID_POKEMON_TYPES.includes(normalizedType)) {
    throw new InvalidPokemonTypeError(type);
  }
  return normalizedType;
}

/**
 * Validates an array of Pokemon types
 * @throws {InvalidPokemonTypeError} if any type is invalid
 */
export function validatePokemonTypes(types: string[]): PokemonTypeKey[] {
  return types.map(validatePokemonType);
}

/**
 * Type guard to check if a string is a valid Pokemon type
 */
export function isPokemonType(type: string): type is PokemonTypeKey {
  return VALID_POKEMON_TYPES.includes(type.toLowerCase() as PokemonTypeKey);
}
