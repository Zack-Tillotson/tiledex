import { Campaign } from "./campaign.js";

export interface EpisodeObjective {
  description: string;
  completed: boolean;
}

export interface Episode {
  id: string;
  owner: string;
  campaign: Campaign["id"];
  title: string;
  objectives: EpisodeObjective[];
  dateStarted: string;
  dateCompleted: string;
}
