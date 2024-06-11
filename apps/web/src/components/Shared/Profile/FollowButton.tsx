import { useAuthenticationStore } from "@/components/Authentication/store";
import {
  type Profile,
  SessionType,
  useFollow,
  useSession,
} from "@lens-protocol/react-web";
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
  const setRegisterProfileOpen = useAuthenticationStore(
    (state) => state.setRegisterProfileOpen,
  );
  const { data: session } = useSession();
  const { execute: follow, loading: followLoading } = useFollow();

  const onFollow = async () => {
    if (session?.type !== SessionType.WithProfile) {
      setRegisterProfileOpen(true);
      return;
    }

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

  const isLoggedLensProfile = session?.type === SessionType.WithProfile;
  const canFollow = profile.operations.canFollow === "YES";
  const isDisabled = isLoggedLensProfile ? !canFollow || followLoading : false;

  if (type === "icon") {
    return (
      <IconButton
        disabled={isDisabled}
        loading={followLoading}
        onClick={onFollow}
        title="Follow"
      >
        <IconUserPlus size={16} />
      </IconButton>
    );
  }

  return (
    <Button disabled={isDisabled} loading={followLoading} onClick={onFollow}>
      Follow <IconUserPlus size={16} />
    </Button>
  );
};
