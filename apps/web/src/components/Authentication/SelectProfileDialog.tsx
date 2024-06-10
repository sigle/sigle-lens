import {
  type Profile,
  useLogin,
  useProfilesManaged,
} from "@lens-protocol/react-web";
import { Callout, Dialog, Flex, Spinner } from "@radix-ui/themes";
import { IconInfoCircle } from "@tabler/icons-react";
import { usePostHog } from "posthog-js/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { SignInWithLens } from "./SignIn/SignInLens";
import { SignInWithWallet } from "./SignIn/SignInWallet";
import { useAuthenticationStore } from "./store";

export const SelectProfileDialog = () => {
  const { isConnected, address } = useAccount();
  const selectProfileOpen = useAuthenticationStore(
    (state) => state.selectProfileOpen,
  );
  const setSelectProfileOpen = useAuthenticationStore(
    (state) => state.setSelectProfileOpen,
  );

  // If during the flow the user switch to another wallet that is not connected
  // we close the dialog to not show an empty state
  useEffect(() => {
    if (!isConnected) {
      setSelectProfileOpen(false);
    }
  }, [isConnected, setSelectProfileOpen]);

  return (
    <Dialog.Root open={selectProfileOpen} onOpenChange={setSelectProfileOpen}>
      <Dialog.Content size="3" className="max-w-[450px]">
        {isConnected && address && <ProfilesList address={address} />}
      </Dialog.Content>
    </Dialog.Root>
  );
};

interface ProfilesListProps {
  address: string;
}

const ProfilesList = ({ address }: ProfilesListProps) => {
  const posthog = usePostHog();
  const {
    data: profiles,
    error: profilesError,
    loading: profilesLoading,
  } = useProfilesManaged({ for: address });
  const { execute: login, loading: loginLoading } = useLogin();
  const setSelectProfileOpen = useAuthenticationStore(
    (state) => state.setSelectProfileOpen,
  );
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const onSelectProfile = async (profile?: Profile) => {
    // To prevent another profile selection before the login is done
    if (selectedProfile) return;

    if (profile) {
      setSelectedProfile(profile);
    }
    const loginResult = await login({
      address,
      profileId: profile ? profile.id : undefined,
    });
    if (loginResult.isFailure()) {
      setSelectedProfile(null);
      toast.error("Failed to sign in", {
        description: loginResult.error.message,
      });
      posthog.capture("user_login_failed", {
        address,
        profileId: profile ? profile.id : undefined,
        step: "login",
      });
      return;
    }
    toast.message("Signed in", {
      description: "You signed in successfully!",
    });
    posthog.capture("user_logged_in", {
      address,
      profileId: profile ? profile.id : undefined,
    });
    setSelectProfileOpen(false);
  };

  if (profilesLoading) {
    return (
      <Flex justify="center" py="5">
        <Spinner />
      </Flex>
    );
  }

  if (profilesError) {
    return (
      <Callout.Root color="red" mt="4">
        <Callout.Icon>
          <IconInfoCircle />
        </Callout.Icon>
        <Callout.Text>
          Failed to load Lens profiles. Error: {profilesError.message}
        </Callout.Text>
      </Callout.Root>
    );
  }

  if (profiles.length === 0) {
    return (
      <SignInWithWallet
        connecting={loginLoading}
        onConnectWallet={onSelectProfile}
      />
    );
  }

  return (
    <SignInWithLens
      profiles={profiles}
      selectedProfile={selectedProfile}
      onSelectProfile={onSelectProfile}
    />
  );
};
