import { useQuery } from "@tanstack/react-query";
import { getPartyMember } from "../../data/library.js";
import { PartyMember } from "../../types/party.js";

/**
 * Custom hook to fetch party member data using react-query
 * @param id - The party member ID to fetch (optional for new members)
 * @returns Query result with party member data
 */
export function usePartyMember(id?: string) {
  return useQuery({
    queryKey: ["party-member", id],
    queryFn: async (): Promise<PartyMember | null> => {
      if (!id) {
        return null;
      }
      return await getPartyMember(id);
    },
    enabled: !!id, // Only run query if id is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
} 