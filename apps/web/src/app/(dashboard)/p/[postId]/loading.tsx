import { Container, Heading, Skeleton, Text } from "@radix-ui/themes";

export const PagePostSkeleton = () => {
  return (
    <Container size="2" mt="8" px="4" pb="6">
      <div className="space-y-8">
        {/* Title */}
        <Skeleton className="w-full max-w-[550px]">
          <Heading size="8">&#8203;</Heading>
        </Skeleton>

        {/* Avatar */}
        <div className="flex items-center space-x-1">
          <Skeleton className="size-12 rounded-3" />
          <div className="space-y-2">
            <Skeleton className="w-[160px]">
              <Text as="div" size="1">
                &#8203;
              </Text>
            </Skeleton>
            <Skeleton className="w-[80px]">
              <Text as="div" size="1">
                &#8203;
              </Text>
            </Skeleton>
          </div>
        </div>

        {/* Actions */}
        <Skeleton className="h-[58px] w-full" />

        {/* Image */}
        <Skeleton className="h-[350px] w-full" />

        {/* Text */}
        <div className="space-y-2">
          <Skeleton className="w-full">
            <Text as="div" size="1">
              &#8203;
            </Text>
          </Skeleton>
          <Skeleton className="w-full">
            <Text as="div" size="1">
              &#8203;
            </Text>
          </Skeleton>
          <Skeleton className="w-full">
            <Text as="div" size="1">
              &#8203;
            </Text>
          </Skeleton>
        </div>
      </div>
    </Container>
  );
};

export default PagePostSkeleton;
