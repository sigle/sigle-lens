"use client";

import { GetFamiliarCards } from "@/components/Dashboard/GetFamiliarCards";
import { LatestDrafts } from "@/components/Dashboard/LatestDrafts";
import { LatestPublication } from "@/components/Dashboard/LatestPublication";
import { SessionType, useSession } from "@lens-protocol/react-web";
import { Grid, Heading } from "@radix-ui/themes";

export default function Dashboard() {
  const { data: session } = useSession();

  // This will never happen, as the parent already wait for the session to be ready
  if (session?.type !== SessionType.WithProfile) {
    return null;
  }

  return (
    <div className="space-y-5 py-5">
      <Heading>Overview</Heading>

      <Grid
        columns={{
          initial: "1",
          md: "2",
        }}
        gap="5"
        width="auto"
      >
        <LatestPublication profile={session.profile} />
        <LatestDrafts />
      </Grid>

      <GetFamiliarCards />
    </div>
  );
}
