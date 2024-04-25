"use client";

import { Heading } from "@radix-ui/themes";
import { SessionType, useSession } from "@lens-protocol/react-web";
import { ProfileManagers } from "@/components/Dashboard/Settings/ProfileManagers/ProfileManagers";

export default function Settings() {
  const { data: session } = useSession();

  // This will never happen, as the parent already wait for the session to be ready
  if (session?.type !== SessionType.WithProfile) {
    return null;
  }

  return (
    <div className="space-y-8 py-5">
      <Heading>Settings</Heading>

      <ProfileManagers profile={session.profile} />
    </div>
  );
}
