"use client";

import { cn } from "@/lib/cn";
import { prettifyUrl } from "@/lib/prettify-url";
import { getProfileHandle } from "@/lib/profile";
import type { Profile } from "@lens-protocol/react-web";
import { Heading, Link, Text } from "@radix-ui/themes";
import { IconLink } from "@tabler/icons-react";
import NextLink from "next/link";
import { useState } from "react";
import { FollowersDialog } from "../Shared/Profile/FollowersDialog";
import { FollowingDialog } from "../Shared/Profile/FollowingDialog";
import { ProfileMarkdownDescription } from "../Shared/Profile/MarkdownDescription";

interface ProfileInfoProps {
  profile: Profile;
}

export const ProfileInfo = ({ profile }: ProfileInfoProps) => {
  const [followersDialogOpen, setFollowersDialogOpen] = useState<
    "following" | "followers" | false
  >(false);

  const metaWebsite = profile.metadata?.attributes?.find(
    (attribute) => attribute.key === "website",
  );
  const metaX = profile.metadata?.attributes?.find(
    (attribute) => attribute.key === "x",
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

      {profile.metadata?.bio ? (
        <Text mt="3" as="p" color="gray" size="2" asChild>
          <ProfileMarkdownDescription content={profile.metadata.bio} />
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
