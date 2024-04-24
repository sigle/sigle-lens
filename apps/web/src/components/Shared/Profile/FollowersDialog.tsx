import { Dialog, Flex, Text } from "@radix-ui/themes";
import {
  LimitType,
  ProfileId,
  useProfileFollowers,
} from "@lens-protocol/react-web";
import { useLensInfiniteScroll } from "@/hooks/use-lens-infinite-scroll";
import { FollowUserCardSkeleton } from "./FollowUserCardSkeleton";
import { FollowUserCard } from "./FollowUserCard";

interface FollowersDialogProps {
  profileId: ProfileId;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FollowersDialog = ({
  profileId,
  open,
  onOpenChange,
}: FollowersDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content size="3" className="max-w-[450px]">
        <Dialog.Title>Followers</Dialog.Title>
        <FollowersDialogContent profileId={profileId} />
      </Dialog.Content>
    </Dialog.Root>
  );
};

const FollowersDialogContent = ({
  profileId,
}: Pick<FollowersDialogProps, "profileId">) => {
  const {
    data: followers,
    loading: followersLoading,
    hasMore: hasMoreFollowers,
    observeRef,
  } = useLensInfiniteScroll(
    useProfileFollowers({
      of: profileId,
      limit: LimitType.Fifty,
    })
  );

  if (followersLoading) {
    return (
      <Flex direction="column" gap="4">
        <FollowUserCardSkeleton />
        <FollowUserCardSkeleton />
        <FollowUserCardSkeleton />
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap="4">
      {followers?.map((profile) => (
        <FollowUserCard key={profile.id} profile={profile} />
      ))}

      {hasMoreFollowers && (
        <div
          ref={observeRef}
          key={`observer-${followers?.length}`}
          className="flex items-center justify-center py-2"
        >
          <Text color="gray" size="2">
            Loading more...
          </Text>
        </div>
      )}
    </Flex>
  );
};
