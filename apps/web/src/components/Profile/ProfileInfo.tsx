import { Profile } from "@lens-protocol/react-web";
import { Heading, Link, Text } from "@radix-ui/themes";
import NextLink from "next/link";
import { useState } from "react";
import { IconLink } from "@tabler/icons-react";
import { getProfileHandle } from "@/lib/profile";
import { cn } from "@/lib/cn";
import { prettifyUrl } from "@/lib/prettify-url";
import { FollowingDialog } from "../Shared/Profile/FollowingDialog";
import { FollowersDialog } from "../Shared/Profile/FollowersDialog";

interface ProfileInfoProps {
  profile: Profile;
}

export const ProfileInfo = ({ profile }: ProfileInfoProps) => {
  const [followersDialogOpen, setFollowersDialogOpen] = useState<
    "following" | "followers" | false
  >(false);

  const metaWebsite = profile.metadata?.attributes?.find(
    (attribute) => attribute.key === "website"
  );
  const metaX = profile.metadata?.attributes?.find(
    (attribute) => attribute.key === "x"
  );

  return (
    <>
      <div className="mt-4 space-y-1">
        {profile.metadata?.displayName && (
          <Heading size="6">{profile.metadata.displayName}</Heading>
        )}
        <Text as="p" color="gray" size="2">
          @{getProfileHandle(profile)}
        </Text>
      </div>

      <div className="mt-4 flex gap-2">
        <div
          className={cn({
            "cursor-pointer": profile.stats.following > 0,
          })}
          onClick={() =>
            profile.stats.following > 0 && setFollowersDialogOpen("following")
          }
        >
          <Text weight="medium" size="2">
            {profile.stats.following}
          </Text>{" "}
          <Text color="gray" size="2">
            following
          </Text>
        </div>
        <div
          className={cn({
            "cursor-pointer": profile.stats.followers > 0,
          })}
          onClick={() =>
            profile.stats.followers > 0 && setFollowersDialogOpen("followers")
          }
        >
          <Text weight="medium" size="2">
            {profile.stats.followers}
          </Text>{" "}
          <Text color="gray" size="2">
            followers
          </Text>
        </div>
      </div>

      {/* TODO format bio markdown limited */}
      {profile.metadata?.bio ? (
        <Text mt="3" as="p" color="gray" size="2">
          {profile.metadata.bio}
        </Text>
      ) : null}

      {Object.keys(profile.metadata?.attributes || {}).length > 0 ? (
        <div className="mt-3 flex items-center gap-4">
          {metaX && (
            <Link asChild size="2">
              <NextLink href={`https://x.com/${metaX.value}`} target="_blank">
                @{metaX.value}
              </NextLink>
            </Link>
          )}

          {metaWebsite && (
            <Link asChild size="2">
              <NextLink href={metaWebsite.value} target="_blank">
                <div className="flex items-center gap-1">
                  <IconLink size={16} />
                  {prettifyUrl(metaWebsite.value)}
                </div>
              </NextLink>
            </Link>
          )}
        </div>
      ) : null}

      <FollowingDialog
        profileId={profile.id}
        open={followersDialogOpen === "following"}
        onOpenChange={() => setFollowersDialogOpen(false)}
      />
      <FollowersDialog
        profileId={profile.id}
        open={followersDialogOpen === "followers"}
        onOpenChange={() => setFollowersDialogOpen(false)}
      />
    </>
  );
};
