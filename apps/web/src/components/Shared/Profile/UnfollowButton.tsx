import { type Profile, useUnfollow } from "@lens-protocol/react-web";
import { Button, IconButton } from "@radix-ui/themes";
import { IconUserMinus } from "@tabler/icons-react";
import { usePostHog } from "posthog-js/react";
import { toast } from "sonner";

interface UnfollowProps {
  profile: Profile;
  type?: "button" | "icon";
}

export const UnfollowButton = ({ profile, type }: UnfollowProps) => {
  const posthog = usePostHog();
  const { execute: unfollow, loading: loadingUnfollowing } = useUnfollow();

  const onUnfollow = async () => {
    const result = await unfollow({
      profile,
    });

    if (result.isFailure()) {
      toast.error(result.error.message);
      return;
    }
    posthog.capture("profile_unfollowed", {
      profileId: profile.id,
    });
    toast.message("Unfollowed successfully.");
  };

  if (type === "icon") {
    return (
      <IconButton
        variant="outline"
        disabled={!profile.operations.canUnfollow || loadingUnfollowing}
        loading={loadingUnfollowing}
        onClick={onUnfollow}
        title="Unfollow"
      >
        <IconUserMinus size={16} />
      </IconButton>
    );
  }

  return (
    <Button
      variant="outline"
      disabled={!profile.operations.canUnfollow || loadingUnfollowing}
      loading={loadingUnfollowing}
      onClick={onUnfollow}
    >
      Unfollow <IconUserMinus size={16} />
    </Button>
  );
};
