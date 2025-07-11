'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { PartyMemberForm } from "@repo/adventure/PartyMemberForm";

interface EditPartyMemberViewProps {
  id: string;
}

/**
 * View component for editing an existing party member
 * Handles client-side navigation and form interactions
 * @param id - The ID of the party member to edit (or "-" for placeholder)
 */
export function EditPartyMemberView({ id }: EditPartyMemberViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // If the ID is the placeholder value, get it from search parameters
  const actualId = id === "-" ? searchParams.get("id") || id : id;

  const handleSave = (memberId: string) => {
    router.push("/adventure/party/");
  };

  const handleCancel = () => {
    router.push("/adventure/party/");
  };

  return (
    <PartyMemberForm 
      id={actualId}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
} 