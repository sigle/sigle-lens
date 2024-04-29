"use client";

import { Callout, Container, Flex } from "@radix-ui/themes";
import { notFound, useParams } from "next/navigation";
import { IconInfoCircle } from "@tabler/icons-react";
import { PageEditorSkeleton } from "../../new/loading";
import { usePostsServiceGetApiPostsByPostId } from "@/__generated__/opanapi/queries";

export default function PostEdit() {
  const params = useParams();
  const postId = params.postId as string;

  return <PostEditDraft postId={postId} />;
}

const PostEditError = ({ message }: { message: string }) => {
  return (
    <Flex justify="center" py="7">
      <Callout.Root color="red" mt="4">
        <Callout.Icon>
          <IconInfoCircle />
        </Callout.Icon>
        <Callout.Text>
          Failed to load publication. Error: {message}
        </Callout.Text>
      </Callout.Root>
    </Flex>
  );
};

const PostEditDraft = ({ postId }: { postId: string }) => {
  const {
    data: post,
    isLoading: isLoadingPost,
    error: errorPost,
  } = usePostsServiceGetApiPostsByPostId({
    postId,
  });

  if (isLoadingPost) {
    return <PageEditorSkeleton />;
  }

  if (errorPost) {
    return <PostEditError message={errorPost.message} />;
  }

  if (!post) {
    notFound();
  }

  return null;

  // return (
  //   <EditorFormProvider type="draft" post={post}>
  //     <EditorHeader />
  //     <Container size="2">
  //       <EditorTitle />
  //       <EditorCoverImage />
  //       <EditorTipTap />
  //     </Container>
  //     <EditorSettings />
  //     <PublishDialog postId={postId} />
  //   </EditorFormProvider>
  // );
};
