"use client";
import { useSignInWallet } from "@/hooks/use-sign-in-wallet";
import {
  type Post,
  PublicationReactionType,
  SessionType,
  useReactionToggle,
  useSession,
} from "@lens-protocol/react-web";
import { Button, Tooltip } from "@radix-ui/themes";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { usePostHog } from "posthog-js/react";
import { toast } from "sonner";

interface PublicationLikeProps {
  publication: Post;
}

export const PublicationLike = ({ publication }: PublicationLikeProps) => {
  const posthog = usePostHog();
  const { data: session } = useSession();
  const { signInWithWallet } = useSignInWallet();
  const { execute: toggleReaction, loading: reactionLoading } =
    useReactionToggle();

  const onToggleReaction = async () => {
    if (!session?.authenticated) {
      signInWithWallet();
      return;
    }
    if (session?.type !== SessionType.WithProfile) {
      toast.error("You need a Lens account to like this post.");
      return;
    }

    const toggleReactionResult = await toggleReaction({
      reaction: PublicationReactionType.Upvote,
      publication,
    });
    if (toggleReactionResult.isFailure()) {
      toast.error(toggleReactionResult.error);
      return;
    }

    // This is referencing the old value
    if (!publication.operations.hasUpvoted) {
      posthog.capture("reaction_added", {
        postId: publication.id,
        reaction: PublicationReactionType.Upvote,
      });
    } else {
      posthog.capture("reaction_removed", {
        postId: publication.id,
        reaction: PublicationReactionType.Upvote,
      });
    }
  };

  return (
    <Tooltip content={publication.operations.hasUpvoted ? "Unlike" : "Like"}>
      <Button
        size="1"
        variant="ghost"
        color="gray"
        disabled={reactionLoading}
        onClick={onToggleReaction}
      >
        {publication.operations.hasUpvoted ? (
          <IconHeartFilled size={16} />
        ) : (
          <IconHeart size={16} />
        )}{" "}
        {publication.stats.upvotes}
      </Button>
    </Tooltip>
  );
};
