"use client";

import { ProfileManagers } from "@/components/Dashboard/Settings/ProfileManagers/ProfileManagers";
import { ProfileMetadata } from "@/components/Dashboard/Settings/ProfileMetadata/ProfileMetadata";
import { SessionType, useSession } from "@lens-protocol/react-web";
import { Heading } from "@radix-ui/themes";

export default function Settings() {
  const { data: session } = useSession();

  // This will never happen, as the parent already wait for the session to be ready
  if (session?.type !== SessionType.WithProfile) {
    return null;
  }

  return (
    <div className="space-y-8 py-5">
      <Heading>Settings</Heading>

      <ProfileMetadata profile={session.profile} />
      <ProfileManagers profile={session.profile} />
    </div>
  );
}
