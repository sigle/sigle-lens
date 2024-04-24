import { Dialog, Flex, Text } from "@radix-ui/themes";
import {
  LimitType,
  ProfileId,
  useProfileFollowing,
} from "@lens-protocol/react-web";
import { useLensInfiniteScroll } from "@/hooks/use-lens-infinite-scroll";
import { FollowUserCard } from "./FollowUserCard";
import { FollowUserCardSkeleton } from "./FollowUserCardSkeleton";

interface FollowingDialogProps {
  profileId: ProfileId;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FollowingDialog = ({
  profileId,
  open,
  onOpenChange,
}: FollowingDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content size="3" className="max-w-[450px]">
        <Dialog.Title>Following</Dialog.Title>
        <FollowingDialogContent profileId={profileId} />
      </Dialog.Content>
    </Dialog.Root>
  );
};

const FollowingDialogContent = ({
  profileId,
}: Pick<FollowingDialogProps, "profileId">) => {
  const {
    data: following,
    loading: followingLoading,
    hasMore: hasMoreFollowing,
    observeRef,
  } = useLensInfiniteScroll(
    useProfileFollowing({
      for: profileId,
      limit: LimitType.Fifty,
    })
  );

  if (followingLoading) {
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
      {following?.map((profile) => (
        <FollowUserCard key={profile.id} profile={profile} />
      ))}

      {hasMoreFollowing && (
        <div
          ref={observeRef}
          key={`observer-${following?.length}`}
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
