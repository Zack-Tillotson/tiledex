import { EditPartyMemberView } from "../../../../views/EditPartyMemberView";

interface EditPartyMemberPageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return [
    {
      id: "-",
    },
  ];
}

/**
 * Page for editing an existing party member
 * Server component that renders the client-side view
 * @param params - Route parameters containing the party member ID
 */
export default function EditPartyMemberPage({ params }: EditPartyMemberPageProps) {
  return <EditPartyMemberView id={params.id} />;
} 