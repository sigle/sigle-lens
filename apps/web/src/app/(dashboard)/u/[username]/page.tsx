"use client";

import { useProfile } from "@lens-protocol/react-web";
import { Callout, Container, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { IconInfoCircle } from "@tabler/icons-react";
import { ProfileInfo } from "@/components/Profile/ProfileInfo";
import { PageProfileSkeleton } from "./loading";
import { FadeSlideBottom } from "@/components/ui/animations/FadeSlideBottom";
import { ProfileHeader } from "@/components/Profile/ProfileHeader";

export default function Home({ params }: { params: { username: string } }) {
  const {
    data: profile,
    loading: profileLoading,
    error,
  } = useProfile({
    forHandle: `lens/${params.username}`,
  });

  if (!error && !profile && !profileLoading) {
    notFound();
  }

  if (error) {
    return (
      <Container size="2" px="4">
        <Callout.Root color="red" mt="4">
          <Callout.Icon>
            <IconInfoCircle />
          </Callout.Icon>
          <Callout.Text>{error.message}</Callout.Text>
        </Callout.Root>
      </Container>
    );
  }

  if (profileLoading) {
    return <PageProfileSkeleton />;
  }

  return (
    <FadeSlideBottom>
      <ProfileHeader profile={profile} />

      <Container size="2" px="4">
        <ProfileInfo profile={profile} />

        <Heading className="mt-10" size="5">
          Latest articles
        </Heading>
      </Container>
    </FadeSlideBottom>
  );
}
