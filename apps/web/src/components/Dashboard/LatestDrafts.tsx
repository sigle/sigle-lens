import {
  PostsServiceGetApiPostsListDefaultResponse,
  usePostsServiceGetApiPostsList,
} from "@/__generated__/opanapi/queries";
import { Button, Card, Flex, Heading, Spinner, Text } from "@radix-ui/themes";
import { format } from "date-fns";
import Link from "next/link";

export const LatestDrafts = () => {
  const {
    data: drafts,
    isLoading: loadingDrafts,
    error: errorDrafts,
  } = usePostsServiceGetApiPostsList<
    PostsServiceGetApiPostsListDefaultResponse,
    Error
  >({
    limit: 5,
  });

  return (
    <div>
      <Flex justify="between" align="center">
        <Text size="2">Drafts</Text>
        <Button size="1" color="gray" variant="ghost">
          <Link href="/dashboard/drafts">View all</Link>
        </Button>
      </Flex>
      <Card mt="2" size="2">
        {loadingDrafts ? (
          <Flex justify="center" py="7">
            <Spinner />
          </Flex>
        ) : null}

        {errorDrafts ? (
          <Flex justify="center" py="7">
            <Text size="2" color="red">
              An error occurred, please try again later. Error:{" "}
              {errorDrafts.message}
            </Text>
          </Flex>
        ) : null}

        {!loadingDrafts && drafts?.length === 0 ? (
          <Flex justify="center" py="7">
            <Text size="2" color="gray">
              No drafts yet
            </Text>
          </Flex>
        ) : null}

        {drafts?.map((draft) => (
          <div
            key={draft.id}
            className="border-b border-solid border-gray-6 py-5 first:pt-0 last:border-b-0 last:pb-0"
          >
            <Link href={`/p/${draft.id}/edit`}>
              {draft.metaTitle || draft.title ? (
                <Heading as="h3" size="4" className="line-clamp-2">
                  {draft.metaTitle || draft.title}
                </Heading>
              ) : (
                <Heading as="h3" size="4" className="line-clamp-2" color="gray">
                  No title
                </Heading>
              )}
            </Link>
            <Text as="p" mt="3" color="gray" size="1" className="uppercase">
              {format(new Date(draft.createdAt), "MMM dd")}
            </Text>
          </div>
        ))}
      </Card>
    </div>
  );
};
