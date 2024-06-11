import { useAuthenticationStore } from "@/components/Authentication/store";
import {
  type Profile,
  SessionType,
  useSession,
  useUnfollow,
} from "@lens-protocol/react-web";
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
  const setRegisterProfileOpen = useAuthenticationStore(
    (state) => state.setRegisterProfileOpen,
  );
  const { data: session } = useSession();
  const { execute: unfollow, loading: loadingUnfollowing } = useUnfollow();

  const onUnfollow = async () => {
    if (session?.type !== SessionType.WithProfile) {
      setRegisterProfileOpen(true);
      return;
    }

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

  const isLoggedLensProfile = session?.type === SessionType.WithProfile;
  const isDisabled = isLoggedLensProfile
    ? !profile.operations.canUnfollow || loadingUnfollowing
    : false;

  if (type === "icon") {
    return (
      <IconButton
        variant="outline"
        disabled={isDisabled}
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
      disabled={isDisabled}
      loading={loadingUnfollowing}
      onClick={onUnfollow}
    >
      Unfollow <IconUserMinus size={16} />
    </Button>
  );
};
