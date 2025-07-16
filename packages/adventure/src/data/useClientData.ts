import { useQueries } from "@tanstack/react-query";
import { Campaign } from "../types/campaign.js";
import { CampaignEpisode } from "../types/campaign.js";
import { Party } from "../types/party.js";
import { getParty, getCampaignData, getEpisodeData } from "./library.js";

interface Request {
  party?: boolean;
  campaign?: boolean;
  episode?: string;
}

interface Result {
  party?: Party;
  campaign?: Campaign;
  episode?: CampaignEpisode;
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
      queryFn: getCampaignData,
    });
  }

  // Add episode query if requested
  if (request.episode) {
    queries.push({
      queryKey: ["episode", request.episode],
      queryFn: () => getEpisodeData(request.episode!),
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
    result.episode = results[queryIndex]?.data as CampaignEpisode | undefined;
  }

  const isLoading = results.some(result => result.isLoading);

  return {
    isLoading,
    data: result,
  };
}
