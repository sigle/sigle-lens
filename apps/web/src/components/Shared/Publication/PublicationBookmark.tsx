"use client";
import { useSignInWallet } from "@/hooks/use-sign-in-wallet";
import {
  type Post,
  SessionType,
  useBookmarkToggle,
  useSession,
} from "@lens-protocol/react-web";
import { IconButton, Tooltip } from "@radix-ui/themes";
import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react";
import { usePostHog } from "posthog-js/react";
import { toast } from "sonner";

interface PublicationBookmarkProps {
  publication: Post;
}

export const PublicationBookmark = ({
  publication,
}: PublicationBookmarkProps) => {
  const posthog = usePostHog();
  const { data: session } = useSession();
  const { signInWithWallet } = useSignInWallet();
  const { execute: toggleBookmark, loading: bookmarkLoading } =
    useBookmarkToggle();

  const onToggleBookmark = async () => {
    if (!session?.authenticated) {
      signInWithWallet();
      return;
    }
    if (session?.type !== SessionType.WithProfile) {
      toast("You need a Lens account to bookmark this post.");
      return;
    }

    const toggleReactionResult = await toggleBookmark({
      publication,
    });
    if (toggleReactionResult.isFailure()) {
      toast.error(toggleReactionResult.error);
      return;
    }

    // This is referencing the old value
    if (!publication.operations.hasBookmarked) {
      posthog.capture("bookmark_added", {
        postId: publication.id,
      });
    } else {
      posthog.capture("bookmark_removed", {
        postId: publication.id,
      });
    }
  };

  return (
    <Tooltip
      content={
        publication.operations.hasBookmarked ? "Remove bookmark" : "Bookmark"
      }
    >
      <IconButton
        size="1"
        variant="ghost"
        color="gray"
        disabled={bookmarkLoading}
        onClick={onToggleBookmark}
      >
        {publication.operations.hasBookmarked ? (
          <IconBookmarkFilled size={16} />
        ) : (
          <IconBookmark size={16} />
        )}
      </IconButton>
    </Tooltip>
  );
};
