import { PokemonGrid } from "../../views/PokemonGrid";

// In Next.js App Router, page props are typed with these interfaces
export interface PageProps {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function PokemonPage({ searchParams }: PageProps) {
  // Helper function to get the first value from a string or array of strings
  const getParamValue = (param: string | string[] | undefined): string | undefined => {
    if (!param) return undefined;
    return Array.isArray(param) ? param[0] : param;
  };

  // Get the page from the URL query parameters, default to 1 if not provided
  const pageParam = getParamValue(searchParams?.page);
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  
  // Extract filter parameters from URL
  const nameParam = getParamValue(searchParams?.name);
  const mainTypeParam = getParamValue(searchParams?.mainType);
  const secondTypeParam = getParamValue(searchParams?.secondType);
  
  const initialFilters = {
    ...(nameParam ? { name: nameParam } : {}),
    ...(mainTypeParam ? { mainType: mainTypeParam } : {}),
    ...(secondTypeParam ? { secondType: secondTypeParam } : {})
  };
  
  return <PokemonGrid initialPage={page} initialFilters={initialFilters} />;
}
