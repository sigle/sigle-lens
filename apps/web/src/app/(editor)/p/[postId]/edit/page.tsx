"use client";

import {
  type PostsServiceGetApiPostsByPostIdDefaultResponse,
  usePostsServiceGetApiPostsByPostId,
} from "@/__generated__/opanapi/queries";
import { EditorCoverImage } from "@/components/Editor/EditorCoverImage";
import { EditorFormProvider } from "@/components/Editor/EditorFormProvider";
import { EditorTipTap } from "@/components/Editor/EditorTiptap";
import { EditorTitle } from "@/components/Editor/EditorTitle";
import { EditorHeader } from "@/components/Editor/Header/EditorHeader";
import { Callout, Container, Flex } from "@radix-ui/themes";
import { IconInfoCircle } from "@tabler/icons-react";
import { notFound, useParams } from "next/navigation";
import { PageEditorSkeleton } from "../../new/loading";

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
  } = usePostsServiceGetApiPostsByPostId<
    PostsServiceGetApiPostsByPostIdDefaultResponse,
    Error
  >({
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

  return (
    <EditorFormProvider type="draft" post={post}>
      <EditorHeader />
      <Container size="2">
        <EditorTitle />
        <EditorCoverImage />
        <EditorTipTap />
      </Container>
      {/* <EditorSettings />
      <PublishDialog postId={postId} /> */}
    </EditorFormProvider>
  );
};
