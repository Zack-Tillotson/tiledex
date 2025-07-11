'use client'

import { useRouter } from "next/navigation";
import { PartyMemberForm } from "@repo/adventure/PartyMemberForm";

/**
 * View component for creating a new party member
 * Handles client-side navigation and form interactions
 */
export function NewPartyMemberView() {
  const router = useRouter();

  const handleSave = (id: string) => {
    router.push("/adventure/party/");
  };

  const handleCancel = () => {
    router.push("/adventure/party/");
  };

  return (
    <PartyMemberForm 
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
} 