export interface GenerationData {
  id: number;
  name: string;
  startId: number;
  endId: number;
  region: string;
  years: string;
  iconicPokemon: {
    id: number;
    name: string;
    imageUrl: string;
    type: string;
  };
}

export const generations: GenerationData[] = [
  {
    id: 1,
    name: "Generation I",
    startId: 1,
    endId: 151,
    region: "Kanto",
    years: "1996-1999",
    iconicPokemon: {
      id: 1,
      name: "Bulbasaur",
      imageUrl: "/images/official_artwork/1.png",
      type: "Grass",
    },
  },
  {
    id: 2,
    name: "Generation II",
    startId: 152,
    endId: 251,
    region: "Johto",
    years: "1999-2002",
    iconicPokemon: {
      id: 155,
      name: "Cyndaquil",
      imageUrl: "/images/official_artwork/155.png",
      type: "Fire",
    },
  },
  {
    id: 3,
    name: "Generation III",
    startId: 252,
    endId: 386,
    region: "Hoenn",
    years: "2002-2006",
    iconicPokemon: {
      id: 258,
      name: "Mudkip",
      imageUrl: "/images/official_artwork/258.png",
      type: "Water",
    },
  },
  {
    id: 4,
    name: "Generation IV",
    startId: 387,
    endId: 493,
    region: "Sinnoh",
    years: "2006-2010",
    iconicPokemon: {
      id: 387,
      name: "Turtwig",
      imageUrl: "/images/official_artwork/387.png",
      type: "Grass",
    },
  },
  {
    id: 5,
    name: "Generation V",
    startId: 494,
    endId: 649,
    region: "Unova",
    years: "2010-2013",
    iconicPokemon: {
      id: 498,
      name: "Tepig",
      imageUrl: "/images/official_artwork/498.png",
      type: "Fire",
    },
  },
  {
    id: 6,
    name: "Generation VI",
    startId: 650,
    endId: 721,
    region: "Kalos",
    years: "2013-2016",
    iconicPokemon: {
      id: 656,
      name: "Froakie",
      imageUrl: "/images/official_artwork/656.png",
      type: "Water",
    },
  },
  {
    id: 7,
    name: "Generation VII",
    startId: 722,
    endId: 809,
    region: "Alola",
    years: "2016-2019",
    iconicPokemon: {
      id: 722,
      name: "Rowlet",
      imageUrl: "/images/official_artwork/722.png",
      type: "Grass",
    },
  },
  {
    id: 8,
    name: "Generation VIII",
    startId: 810,
    endId: 898,
    region: "Galar",
    years: "2019-2022",
    iconicPokemon: {
      id: 813,
      name: "Scorbunny",
      imageUrl: "/images/official_artwork/813.png",
      type: "Fire",
    },
  },
  {
    id: 9,
    name: "Generation IX",
    startId: 899,
    endId: 1025,
    region: "Paldea",
    years: "2022-Present",
    iconicPokemon: {
      id: 906,
      name: "Sprigatito",
      imageUrl: "/images/official_artwork/906.png",
      type: "Grass",
    },
  },
];

export function getGenerationById(id: number): GenerationData | undefined {
  return generations.find((gen) => gen.id === id);
}

export function getGenerationByPokemonId(
  pokemonId: number,
): GenerationData | undefined {
  return generations.find(
    (gen) => pokemonId >= gen.startId && pokemonId <= gen.endId,
  );
}

export function getGenerationRomanNumeral(id: number): string {
  const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
  return romanNumerals[id - 1] || id.toString();
}
