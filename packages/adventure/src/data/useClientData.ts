import { useQueries } from "@tanstack/react-query";
import { Campaign } from "../types/campaign.js";
import { Episode } from "../types/episode.js";
import { Party } from "../types/party.js";
import { getParty } from "./library.js";

interface Request {
  party?: boolean;
  campaign?: boolean;
  episode?: Episode["id"];
}

interface Result {
  party?: Party;
  campaign?: Campaign;
  episode?: Episode;
}

interface HookResult {
  isLoading: boolean;
  data: Result;
}

export function useClientData(request: Request): HookResult {
  const queries = [];

  // Add party query if requested
  if (request.party) {
    queries.push({
      queryKey: ["party"],
      queryFn: getParty,
    });
  }

  // Add campaign query if requested
  if (request.campaign) {
    queries.push({
      queryKey: ["campaign"],
      queryFn: () => Promise.resolve(undefined as Campaign | undefined), // TODO: implement getCampaign
    });
  }

  // Add episode query if requested
  if (request.episode) {
    queries.push({
      queryKey: ["episode", request.episode],
      queryFn: () => Promise.resolve(undefined as Episode | undefined), // TODO: implement getEpisode
    });
  }

  const results = useQueries({
    queries,
  });

  const result: Result = {};

  // Map results back to the result object
  let queryIndex = 0;
  if (request.party) {
    result.party = results[queryIndex]?.data as Party | undefined;
    queryIndex++;
  }
  if (request.campaign) {
    result.campaign = results[queryIndex]?.data as Campaign | undefined;
    queryIndex++;
  }
  if (request.episode) {
    result.episode = results[queryIndex]?.data as Episode | undefined;
  }

  const isLoading = results.some(result => result.isLoading);

  return {
    isLoading,
    data: result,
  };
}
