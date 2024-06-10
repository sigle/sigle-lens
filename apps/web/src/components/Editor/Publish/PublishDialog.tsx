"use client";

import {
  usePostsServicePostApiPostsByPostIdDelete,
  usePostsServicePostApiPostsByPostIdUploadMetadata,
} from "@/__generated__/opanapi/queries";
import { useLensClient } from "@/hooks/use-lens-client";
import {
  SessionType,
  useCreatePost,
  useCurrencies,
  useSession,
} from "@lens-protocol/react-web";
import { Dialog, Flex, Spinner, Text } from "@radix-ui/themes";
import * as Sentry from "@sentry/nextjs";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import type { EditorPostFormData } from "../EditorFormProvider";
import { useEditorStore } from "../store";
import {
  generateLensActionsFromForm,
  generateLensMetadataFromForm,
} from "../utils";
import { PublishReview } from "./PublishReview";

interface PublishDialogProps {
  postId: string;
}

export const PublishDialog = ({ postId }: PublishDialogProps) => {
  const posthog = usePostHog();
  const { data: currencies } = useCurrencies();
  const router = useRouter();
  const { handleSubmit } = useFormContext<EditorPostFormData>();
  const editor = useEditorStore((state) => state.editor);
  const publishOpen = useEditorStore((state) => state.publishOpen);
  const setPublishOpen = useEditorStore((state) => state.setPublishOpen);
  const [isTransactionPending, setIsTransactionPending] = useState(false);
  const { execute: createPost, loading: loadingCreatePost } = useCreatePost();
  const { mutateAsync: deletePost } =
    usePostsServicePostApiPostsByPostIdDelete();
  const { mutateAsync: uploadMetadata } =
    usePostsServicePostApiPostsByPostIdUploadMetadata();
  const { data: session } = useSession();
  const lensClient = useLensClient();

  const onSubmit = () => {
    handleSubmit(
      async (data) => {
        try {
          if (!currencies) {
            toast.error("Error publishing", {
              description: "Currency list not loaded",
            });
            return;
          }
          if (session?.type !== SessionType.WithProfile) {
            toast.error("Error publishing", {
              description: "You must be logged in to publish",
            });
            return;
          }

          // TODO verify that images do not start with blob: otherwise it means it's still loading (in content)

          const lensId =
            await lensClient.publication.predictNextOnChainPublicationId({
              from: session.profile.id,
            });
          const metadata = await generateLensMetadataFromForm({
            editor,
            postId: lensId,
            post: data,
          });
          const action = generateLensActionsFromForm({
            post: data,
            address: session.profile.ownedBy.address,
            currencies,
          });

          const uploadedMetadata = await uploadMetadata({
            postId,
            requestBody: {
              metadata,
            },
          });

          const arweaveUrl = `ar://${uploadedMetadata.id}`;
          const result = await createPost({
            metadata: arweaveUrl,
            actions: [action],
          });
          if (result.isFailure()) {
            Sentry.captureException(result.error);
            toast.error("Error publishing", {
              description: result.error.message,
            });
            return;
          }

          setIsTransactionPending(true);
          const completionResult = await result.value.waitForCompletion();
          if (completionResult.isFailure()) {
            Sentry.captureException(completionResult.error);
            toast("Error publishing", {
              description: completionResult.error.message,
            });
            return;
          }

          posthog.capture("post_published", {
            postId,
            profileId: session.profile.id,
          });

          await deletePost({
            postId,
          });

          router.push(`/p/${completionResult.value.id}?published=true`);
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        } catch (error: any) {
          console.error("Error SDK publishing", error);
          Sentry.captureException(error);
          toast("Error publishing", {
            description: error.message ? error.message : error,
          });
          return;
        }
      },
      (errors) => {
        console.error("Publishing form errors", { errors });
        toast("Error publishing", {
          description: "Please check the form for errors",
        });
      },
    )();
  };

  const onOpenChange = (open: boolean) => {
    if (!loadingCreatePost || isTransactionPending) {
      setPublishOpen(open);
    }
  };

  return (
    <Dialog.Root open={publishOpen} onOpenChange={onOpenChange}>
      <Dialog.Content size="3" className="max-w-screen-sm">
        {!loadingCreatePost && !isTransactionPending ? (
          <PublishReview onPublish={onSubmit} />
        ) : (
          <Flex
            justify="center"
            align="center"
            py="7"
            direction="column"
            className="space-y-2"
          >
            <div className="mb-2">
              <Spinner />
            </div>
            <Text as="div" size="2">
              Your post is being published...
            </Text>
            {isTransactionPending ? (
              <Text align="center" color="gray" size="2">
                Your post has been submitted to the blockchain.
                <br />
                It may take up to 1 minute for the transaction to succeed.
              </Text>
            ) : null}
          </Flex>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
};
