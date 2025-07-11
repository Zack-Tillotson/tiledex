export interface PartyPokemon {
  dexId: number;
  dateCaught: string;
  nickname: string;
}

export interface PartyGoal {
  description: string;
  completed: boolean;
}

export interface PartyMember {
  id: string;
  name: string;
  avatar: string;
  roster: PartyPokemon[];
  goals: PartyGoal[];
}

export type Party = PartyMember[];
