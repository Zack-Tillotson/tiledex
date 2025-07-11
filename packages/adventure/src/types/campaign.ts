import { Party } from "./party.js";

export interface CampaignObjective {
  description: string;
  completed: boolean;
}

export interface Campaign {
  id: string;
  owner: string;
  party: Party;
  objectives: CampaignObjective[];
}
