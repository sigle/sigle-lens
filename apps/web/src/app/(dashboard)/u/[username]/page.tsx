import { lensClient } from "@/lib/lens";
import { getProfileHandle } from "@/lib/profile";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProfileClient } from "./PageClient";

type Props = {
  params: { username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const profile = await lensClient.profile.fetch({
    forHandle: `lens/${params.username}`,
  });

  if (!profile) {
    notFound();
  }

  const title =
    profile.metadata?.displayName || `@${getProfileHandle(profile)}`;
  const description = profile.metadata?.bio
    ? profile.metadata.bio
    : `Read ${title} publications on Sigle.`;

  return {
    title: `${title} | Sigle Profile`,
    description,
  };
}

export default function Home({ params }: Props) {
  return <ProfileClient params={params} />;
}
