import { getProfileAvatarUrl, getProfileHandle } from "@/lib/profile";
import { Routes } from "@/lib/routes";
import {
  type Profile,
  SessionType,
  useSession,
} from "@lens-protocol/react-web";
import { Avatar, Flex, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { FollowButton } from "./FollowButton";
import { UnfollowButton } from "./UnfollowButton";

interface FollowUserCardProps {
  profile: Profile;
}

export const FollowUserCard = ({ profile }: FollowUserCardProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const isCurrentUser =
    session?.type === SessionType.WithProfile &&
    session.profile.id === profile.id;

  return (
    <Flex gap="4" justify="between" align="center">
      <Flex
        gap="4"
        align="center"
        className="cursor-pointer"
        onClick={() =>
          router.push(
            Routes.userProfile({
              username: profile.handle ? profile.handle.localName : profile.id,
            }),
          )
        }
      >
        <Avatar
          src={getProfileAvatarUrl(profile)}
          fallback={profile.handle?.localName[0] || profile.id[0]}
          alt={getProfileHandle(profile)}
          size="3"
        />
        <Flex direction="column">
          {profile.metadata?.displayName ? (
            <Text weight="medium">{profile.metadata.displayName}</Text>
          ) : null}
          <Text color="gray">{getProfileHandle(profile)}</Text>
        </Flex>
      </Flex>
      {!isCurrentUser && !profile.operations.isFollowedByMe.value ? (
        <FollowButton profile={profile} type="icon" />
      ) : null}
      {!isCurrentUser && profile.operations.isFollowedByMe.value ? (
        <UnfollowButton profile={profile} type="icon" />
      ) : null}
    </Flex>
  );
};
