import { GetFamiliarCards } from "@/components/Dashboard/GetFamiliarCards";
import { PublicationCard } from "@/components/Shared/Publication/Card/PublicationCard";
import { FadeSlideBottom } from "@/components/ui/animations/FadeSlideBottom";
import { useLensInfiniteScroll } from "@/hooks/use-lens-infinite-scroll";
import { PublicationMetadataMainFocusType } from "@lens-protocol/client";
import {
  LimitType,
  type Post,
  type Profile,
  PublicationType,
  SessionType,
  usePublications,
  useSession,
} from "@lens-protocol/react-web";
import { Button, Callout, Flex, Text } from "@radix-ui/themes";
import { IconInfoCircle } from "@tabler/icons-react";
import Link from "next/link";
import { FeedSkeleton } from "./ProfileFeedSkeleton";

interface FeedProps {
  profile: Profile;
}

export const Feed = ({ profile }: FeedProps) => {
  const { data: session } = useSession();
  const {
    data: publications,
    loading,
    hasMore: hasMorePublications,
    error,
    observeRef,
  } = useLensInfiniteScroll(
    usePublications({
      limit: LimitType.TwentyFive,
      where: {
        from: [profile.id],
        publicationTypes: [PublicationType.Post],
        metadata: {
          mainContentFocus: [PublicationMetadataMainFocusType.Article],
        },
      },
    }),
  );

  if (error) {
    return (
      <Callout.Root color="red" mt="4">
        <Callout.Icon>
          <IconInfoCircle />
        </Callout.Icon>
        <Callout.Text>Failed to load feed. Error: {error.message}</Callout.Text>
      </Callout.Root>
    );
  }

  if (loading) {
    return <FeedSkeleton />;
  }

  if (
    publications?.length === 0 &&
    session?.type === SessionType.WithProfile &&
    profile.id === session?.profile.id
  ) {
    return (
      <>
        <Flex direction="column" my="9" gap="3" align="center">
          <Text size="2" color="gray" weight="medium">
            You haven{"'"}t published anything yet.
          </Text>
          <Button color="gray" highContrast asChild>
            <Link href="/">Explore</Link>
          </Button>
        </Flex>

        <GetFamiliarCards />
      </>
    );
  }

  if (publications?.length === 0) {
    return (
      <Flex direction="column" mt="6" gap="3" align="center">
        <Text>This user has not published anything yet.</Text>
        <Button color="gray" highContrast asChild>
          <Link href="/">Explore</Link>
        </Button>
      </Flex>
    );
  }

  return (
    <FadeSlideBottom>
      <Flex direction="column">
        {publications.map((publication) => {
          return (
            <PublicationCard
              key={publication.id}
              publication={publication as Post}
            />
          );
        })}
      </Flex>
      {hasMorePublications && (
        <div
          ref={observeRef}
          key={`observer-${publications?.length}`}
          className="flex items-center justify-center py-5"
        >
          <Text color="gray" size="2">
            Loading more...
          </Text>
        </div>
      )}
    </FadeSlideBottom>
  );
};
