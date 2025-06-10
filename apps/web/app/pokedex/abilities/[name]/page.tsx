import { AbilityInfo, getAbilityByName, getAllAbilities } from '@repo/pokeapi';
import { AbilityView } from '@repo/pokedex/AbilityView';
import { Metadata } from 'next';

interface AbilityPageProps {
  params: Promise<{
    name: string;
  }>;
}

// Force static rendering for this page
export const dynamic = "force-static";

// Define the generation numbers for static generation
export async function generateStaticParams() {
  const abilities = getAllAbilities();
  return abilities.map((ability: AbilityInfo) => ({
    name: ability.name,
  }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: AbilityPageProps): Promise<Metadata> {
  const abilityName = (await params).name;
  const ability = getAbilityByName(abilityName);

  if (!ability) {
    return {
      title: "Pokédex",
      description: "Explore Pokémon in the Pokédex",
    };
  }

  return {
    title: `${ability.name} | Pokédex`,
    description: `Learn about the ${ability.name} ability`,
  };
}

export default async function AbilityPage({ params }: AbilityPageProps) {
  const abilityName = (await params).name;
  return <AbilityView name={abilityName} />;
} 