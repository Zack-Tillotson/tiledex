import { collection, getDocs, query, where } from "firebase/firestore";
import { Party } from "../types/party.js";
import { validateParty } from "../types/validation.js";
import { firebase } from "./firebase.js";

export async function getParty(): Promise<Party> {
  const {db, uid} = await firebase();

  const q = query(collection(db, 'campaigns'), where('owner', '==', uid))
  const snapshot = await getDocs(q)

  const campaigns = snapshot.docs.map((doc) => doc.data())

  if(!campaigns[0]) {
    return []
  }

  // Validate the party data from Firestore
  const rawParty = campaigns[0].party;
  
  try {
    // Validate the entire party structure
    const validatedParty = validateParty(rawParty);
    return validatedParty;
  } catch (error) {
    console.error('Party validation failed:', error);
    // Return empty array if validation fails
    return [];
  }
}