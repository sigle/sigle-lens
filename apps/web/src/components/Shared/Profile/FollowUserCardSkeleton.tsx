import { Flex, IconButton, Skeleton, Text } from "@radix-ui/themes";

export const FollowUserCardSkeleton = () => {
  return (
    <Flex gap="4" justify="between" align="center">
      <Flex gap="4" align="center">
        {/* Avatar */}
        <Skeleton className="size-10 rounded-3" />

        {/* Names */}
        <div className="space-y-2">
          <Text as="div" size="1">
            <Skeleton>Lorem ipsum</Skeleton>
          </Text>
          <Text as="div" size="1">
            <Skeleton>Lorem ipsum dolor sit</Skeleton>
          </Text>
        </div>
      </Flex>

      {/* Actions */}
      <Skeleton>
        <IconButton>x</IconButton>
      </Skeleton>
    </Flex>
  );
};
