// Define the types of sprites available
export type SpriteType =
  | "front_default"
  | "back_default"
  | "front_shiny"
  | "back_shiny"
  | "official_artwork";

/**
 * Get the local image path for a Pokemon sprite
 * @param id Pokemon ID
 * @param spriteType Type of sprite
 * @returns Local path to the image
 */
export function getLocalImagePath(id: number, spriteType: SpriteType): string {
  return `/images/${spriteType}/${id}.png`;
}

/**
 * Get the URL for a Pokemon sprite
 * @param id Pokemon ID
 * @param spriteType Type of sprite
 * @returns The local path to the image
 */
export function getImageUrl(id: number, spriteType: SpriteType): string {
  return `/images/${spriteType}/${id}.png`;
}

/**
 * Transform Pokemon data to use local image paths
 * @param pokemon Pokemon data object
 * @returns Pokemon with updated sprite URLs
 */
export function useLocalImagesForPokemon<
  T extends { id: number; sprites: Record<string, string> },
>(pokemon: T): T {
  const updatedSprites = { ...pokemon.sprites };

  // Update each sprite type to use local path
  (Object.keys(updatedSprites) as SpriteType[]).forEach((spriteType) => {
    if (updatedSprites[spriteType]) {
      updatedSprites[spriteType] = getLocalImagePath(pokemon.id, spriteType);
    }
  });

  return {
    ...pokemon,
    sprites: updatedSprites,
  };
}
