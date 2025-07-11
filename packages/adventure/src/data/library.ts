import { collection, getDocs, query, where, doc, getDoc, updateDoc } from "firebase/firestore";
import { Party, PartyMember } from "../types/party.js";
import { validateParty } from "../types/validation.js";
import { firebase } from "./firebase.js";

/**
 * Get the user's campaign document
 * @returns The campaign document snapshot or null if not found
 */
async function getCampaign() {
  const { db, uid } = await firebase();
  
  const q = query(collection(db, 'campaigns'), where('owner', '==', uid));
  const snapshot = await getDocs(q);
  
  if (snapshot.empty) {
    return null;
  }
  
  return snapshot.docs[0];
}

export async function getParty(): Promise<Party> {
  const campaign = await getCampaign();
  
  if (!campaign) {
    return [];
  }

  const campaignData = campaign.data();
  const rawParty = campaignData.party;
  
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

/**
 * Get a party member by ID from the campaign
 * @param id - The party member ID
 * @returns Party member data or null if not found
 */
export async function getPartyMember(id: string): Promise<PartyMember | null> {
  try {
    const campaign = await getCampaign();
    
    if (!campaign) {
      return null;
    }
    
    const campaignData = campaign.data();
    const party = campaignData.party || [];
    
    // Find the party member by ID
    const member = party.find((member: PartyMember) => member.id === id);
    
    if (member) {
      return member;
    }
    
    return null;
  } catch (error) {
    console.error("Error getting party member:", error);
    throw error;
  }
}

/**
 * Save a party member (create or update) within the campaign
 * @param id - The party member ID (null for new member)
 * @param data - The party member data
 * @returns The saved party member ID
 */
export async function savePartyMember(id: string | null, data: Omit<PartyMember, "id">): Promise<string> {
  try {
    const campaign = await getCampaign();
    
    if (!campaign) {
      throw new Error("No campaign found for user");
    }
    
    const campaignData = campaign.data();
    const party = campaignData.party || [];
    
    let memberId: string;
    
    if (id) {
      // Update existing member
      const memberIndex = party.findIndex((member: PartyMember) => member.id === id);
      if (memberIndex === -1) {
        throw new Error("Party member not found");
      }
      
      memberId = id;
      party[memberIndex] = {
        ...data,
        id: memberId,
      };
    } else {
      // Create new member
      memberId = `member_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      party.push({
        ...data,
        id: memberId,
      });
    }
    
    // Update the campaign with the modified party
    await updateDoc(campaign.ref, {
      party: party,
    });
    
    return memberId;
  } catch (error) {
    console.error("Error saving party member:", error);
    throw error;
  }
}