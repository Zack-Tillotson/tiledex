import { EditPartyMemberView } from "../../../../views/EditPartyMemberView";

interface EditPartyMemberPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return [
    {
      id: "-",
    },
  ];
}

export default async function EditPartyMemberPage({ params }: EditPartyMemberPageProps) {
  const { id } = await params;
  return <EditPartyMemberView id={id} />;
} 