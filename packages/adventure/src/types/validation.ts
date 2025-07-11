import { object, string, number, boolean, array, validate } from 'superstruct';
import type { PartyPokemon, PartyGoal, PartyMember, Party } from './party.js';

export const PartyPokemonSchema = object({
  dexId: number(),
  dateCaught: string(),
  nickname: string(),
});

export const PartyGoalSchema = object({
  description: string(),
  completed: boolean(),
});

export const PartyMemberSchema = object({
  id: string(),
  name: string(),
  avatar: string(),
  roster: array(PartyPokemonSchema),
  goals: array(PartyGoalSchema),
});

export const PartySchema = array(PartyMemberSchema);

export function validatePartyPokemon(data: unknown): PartyPokemon {
  const [err, value] = validate(data, PartyPokemonSchema);
  if (err) throw err;
  return value;
}

export function validatePartyGoal(data: unknown): PartyGoal {
  const [err, value] = validate(data, PartyGoalSchema);
  if (err) throw err;
  return value;
}

export function validatePartyMember(data: unknown): PartyMember {
  const [err, value] = validate(data, PartyMemberSchema);
  if (err) throw err;
  return value;
}

export function validateParty(data: unknown): Party {
  const [err, value] = validate(data, PartySchema);
  if (err) throw err;
  return value;
}
