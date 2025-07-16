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
export default async function EditPartyMemberPage({ params }: EditPartyMemberPageProps) {
  const {id} = await params;
  return <EditPartyMemberView id={id} />;
} 