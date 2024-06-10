import { getProfileAvatarUrl, getProfileHandle } from "@/lib/profile";
import type { Profile } from "@lens-protocol/react-web";
import {
  Avatar,
  Card,
  Dialog,
  Flex,
  Link,
  Spinner,
  Text,
} from "@radix-ui/themes";
import { IconChevronRight, IconWallet } from "@tabler/icons-react";
import { useDisconnect } from "wagmi";

interface SignInWithLensProps {
  profiles: Profile[];
  selectedProfile: Profile | null;
  onSelectProfile: (profile: Profile) => void;
}

export const SignInWithLens = ({
  profiles,
  selectedProfile,
  onSelectProfile,
}: SignInWithLensProps) => {
  const { disconnect } = useDisconnect();

  return (
    <>
      <Dialog.Title align="center">Sign in with Lens</Dialog.Title>
      <Dialog.Description size="2" align="center">
        Select a profile to sign in with. Sign the message with your wallet to
        verify you own the profile.
      </Dialog.Description>
      <div className="mt-4 space-y-2">
        {profiles.map((profile) => (
          <Card
            key={profile.id}
            className="cursor-pointer hover:bg-[--accent-a3]"
            onClick={() => onSelectProfile(profile)}
          >
            <Flex justify="between" align="center">
              <Flex gap="3" align="center">
                <Avatar
                  src={getProfileAvatarUrl(profile)}
                  fallback={profile.handle?.localName[0] || profile.id[0]}
                  alt={getProfileHandle(profile)}
                  size="3"
                />
                <div>
                  {profile.metadata?.displayName ? (
                    <Text as="div" size="2" weight="medium">
                      {profile.metadata.displayName}
                    </Text>
                  ) : null}
                  <Text as="div" size="2" color="gray">
                    {getProfileHandle(profile)}
                  </Text>
                </div>
              </Flex>
              <Text as="div" color="gray">
                {selectedProfile?.id === profile.id ? (
                  <Spinner className="mr-1 size-5" />
                ) : (
                  <IconChevronRight size={24} />
                )}
              </Text>
            </Flex>
          </Card>
        ))}
      </div>
      <Link
        className="mt-1 flex items-center gap-1"
        size="1"
        color="gray"
        onClick={() => disconnect()}
      >
        <IconWallet size={14} />
        Change wallet
      </Link>
    </>
  );
};
