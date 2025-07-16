import { Party } from "./party.js";

export interface CampaignObjective {
  description: string;
  completed: boolean;
}

export interface EpisodeChapter {
  id: string;
  question: string;
  result?: string;
  options?: string[];
}

export interface CampaignEpisode {
  id?: string;
  title?: string;
  description?: string;
  backgroundStory?: string;
  chapters?: EpisodeChapter[];
}

export interface Campaign {
  id: string;
  owner: string;
  party: Party;
  objectives: CampaignObjective[];
  episodes?: CampaignEpisode[];
}
