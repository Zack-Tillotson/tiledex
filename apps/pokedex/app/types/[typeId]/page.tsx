import { PokemonType } from "../../../views/PokemonType/PokemonType";
import { Metadata } from "next";

interface PageProps {
  params: { typeId: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { typeId } = params;
  const formattedTypeId = typeId.charAt(0).toUpperCase() + typeId.slice(1).toLowerCase();
  
  return {
    title: `${formattedTypeId} Type Pokémon | Pokédex`,
    description: `View all ${formattedTypeId} type Pokémon and learn about their characteristics.`
  };
}

export default function TypePage({ params }: PageProps) {
  const { typeId } = params;
  
  return <PokemonType typeId={typeId} />;
}
