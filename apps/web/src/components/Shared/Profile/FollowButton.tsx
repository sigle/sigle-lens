import { Profile, useFollow } from "@lens-protocol/react-web";
import { Button, IconButton } from "@radix-ui/themes";
import { IconUserPlus } from "@tabler/icons-react";
import { usePostHog } from "posthog-js/react";
import { toast } from "sonner";

interface FollowProps {
  profile: Profile;
  type?: "button" | "icon";
}

export const FollowButton = ({ profile, type = "button" }: FollowProps) => {
  const posthog = usePostHog();
  const { execute: follow, loading: followLoading } = useFollow();

  const onFollow = async () => {
    const result = await follow({
      profile,
    });

    if (result.isFailure()) {
      toast.error(result.error.message);
      return;
    }
    posthog.capture("profile_followed", {
      profileId: profile.id,
    });
    toast.message("Followed successfully!");
  };

  const canFollow = profile.operations.canFollow === "YES";

  if (type === "icon") {
    return (
      <IconButton
        disabled={!canFollow || followLoading}
        loading={followLoading}
        onClick={onFollow}
        title="Follow"
      >
        <IconUserPlus size={16} />
      </IconButton>
    );
  }

  return (
    <Button
      disabled={!canFollow || followLoading}
      loading={followLoading}
      onClick={onFollow}
    >
      Follow <IconUserPlus size={16} />
    </Button>
  );
};
