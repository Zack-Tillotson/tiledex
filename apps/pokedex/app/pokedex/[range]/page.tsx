import { PokemonGrid } from "../../../views/PokemonGrid";
import { notFound } from "next/navigation";



// Force static rendering for this page
export const dynamic = 'force-static';

// Define the generation ranges for static generation
export async function generateStaticParams() {
  return [
    { range: '1-151' },    // Generation I (Kanto)
    { range: '152-251' },  // Generation II (Johto)
    { range: '252-386' },  // Generation III (Hoenn)
    { range: '387-493' },  // Generation IV (Sinnoh)
    { range: '494-649' },  // Generation V (Unova)
    { range: '650-721' },  // Generation VI (Kalos)
    { range: '722-809' },  // Generation VII (Alola)
    { range: '810-898' }   // Generation VIII (Galar)
  ];
}

// Generate metadata for the page
// @ts-expect-error - Next.js App Router type issues
export async function generateMetadata({ params }) {
  const range = params.range;
  const rangeMatch = range.match(/^(\d+)-(\d+)$/);
  
  if (!rangeMatch) {
    return {
      title: "Pokédex",
      description: "Explore Pokémon in the Pokédex"
    };
  }
  
  const startIndex = parseInt(rangeMatch[1] || '1', 10);
  const endIndex = parseInt(rangeMatch[2] || '50', 10);
  
  return {
    title: `Pokémon #${startIndex}-${endIndex} | Pokédex`,
    description: `Browse Pokémon from #${startIndex} to #${endIndex} in the Pokédex`
  };
}

// @ts-expect-error - Next.js App Router type issues
export default async function PokedexRangePage({ params, searchParams }) {
  // Parse the range parameter (e.g., "1-50")
  const range = params.range;
  const rangeMatch = range.match(/^(\d+)-(\d+)$/);
  
  if (!rangeMatch) {
    // If the range format is invalid, return 404
    notFound();
  }
  
  const startIndex = parseInt(rangeMatch[1] || '1', 10);
  const endIndex = parseInt(rangeMatch[2] || '50', 10);
  
  // Validate the range
  if (isNaN(startIndex) || isNaN(endIndex) || startIndex > endIndex || startIndex < 1) {
    notFound();
  }
  
  // Helper function to get the first value from a string or array of strings
  const getParamValue = (param: string | string[] | undefined): string | undefined => {
    if (!param) return undefined;
    return Array.isArray(param) ? param[0] : param;
  };
  
  // Extract filter parameters from URL
  const nameParam = getParamValue(searchParams?.name) || '';
  const mainTypeParam = getParamValue(searchParams?.mainType) || '';
  
  const initialFilters = {
    ...(nameParam ? { name: nameParam } : {}),
    ...(mainTypeParam ? { mainType: mainTypeParam } : {}),
  };
  
  return <PokemonGrid startIndex={startIndex} endIndex={endIndex} initialFilters={initialFilters} showFilters={false} />;
}
