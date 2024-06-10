"use client";

import {
  type PostsServiceGetApiPostsByPostIdDefaultResponse,
  usePostsServiceGetApiPostsList,
  usePostsServicePostApiPostsByPostIdDelete,
} from "@/__generated__/opanapi/queries";
import {
  Button,
  Card,
  DropdownMenu,
  Flex,
  Heading,
  IconButton,
  Spinner,
  Text,
} from "@radix-ui/themes";
import { IconDotsVertical } from "@tabler/icons-react";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function DashboardDrafts() {
  const {
    data: drafts,
    isLoading: loadingDrafts,
    error: errorDrafts,
    refetch: refetchDrafts,
  } = usePostsServiceGetApiPostsList({
    limit: 100,
  });

  return (
    <div className="py-5">
      <Heading>Drafts</Heading>
      <Card mt="5" size="2">
        {loadingDrafts ? (
          <Flex justify="center" py="7">
            <Spinner />
          </Flex>
        ) : null}

        {errorDrafts ? (
          <Flex justify="center" py="7">
            <Text size="2" color="red">
              An error occurred, please try again later
            </Text>
          </Flex>
        ) : null}

        {drafts?.length === 0 ? (
          <Flex
            justify="center"
            align="center"
            py="7"
            gap="4"
            direction="column"
          >
            <Text size="2" color="gray">
              No drafts yet
            </Text>
            <Button color="gray" highContrast asChild>
              <Link href={"/p/new"}>Write a story</Link>
            </Button>
          </Flex>
        ) : null}

        {drafts?.map((draft) => (
          <Draft key={draft.id} draft={draft} refetchDrafts={refetchDrafts} />
        ))}
      </Card>
    </div>
  );
}

const Draft = ({
  draft,
  refetchDrafts,
}: {
  draft: PostsServiceGetApiPostsByPostIdDefaultResponse;
  refetchDrafts: () => Promise<unknown>;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutateAsync: deletePost } = usePostsServicePostApiPostsByPostIdDelete(
    {
      onError: (error: { message: string }) => {
        toast.error("Failed to upload metadata", {
          description: error.message,
        });
      },
    },
  );

  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete this draft?");
    if (!ok) return;

    setIsDeleting(true);
    await deletePost({ postId: draft.id });
    await refetchDrafts();
    toast.message("Draft deleted");
  };

  return (
    <div className="border-b border-solid border-gray-6 py-5 first:pt-0 last:border-b-0 last:pb-0">
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
      <Flex justify="between" align="center">
        <Text as="p" mt="3" color="gray" size="1" className="uppercase">
          {format(new Date(draft.createdAt), "MMM dd")}
        </Text>
        {!isDeleting ? (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <IconButton variant="ghost" color="gray" size="2">
                <IconDotsVertical size={16} />
              </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              align="end"
              variant="soft"
              color="gray"
              highContrast
            >
              <DropdownMenu.Item asChild>
                <Link href={`/p/${draft.id}/edit`}>Edit</Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item onClick={onDelete}>Delete</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        ) : (
          <Spinner />
        )}
      </Flex>
    </div>
  );
};
