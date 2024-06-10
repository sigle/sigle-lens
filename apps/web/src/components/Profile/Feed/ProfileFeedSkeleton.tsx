import { PublicationCardSkeleton } from "@/components/Shared/Publication/Card/PublicationCardSkeleton";
import { Flex } from "@radix-ui/themes";

export const FeedSkeleton = () => {
  return (
    <Flex direction="column">
      <PublicationCardSkeleton />
      <PublicationCardSkeleton />
      <PublicationCardSkeleton />
    </Flex>
  );
};
