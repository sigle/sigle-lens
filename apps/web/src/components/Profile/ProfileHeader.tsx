"use client";

import { env } from "@/env";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/cn";
import {
  getProfileAvatarUrl,
  getProfileCoverUrl,
  getProfileHandle,
} from "@/lib/profile";
import { Routes } from "@/lib/routes";
import {
  type Profile,
  SessionType,
  useSession,
} from "@lens-protocol/react-web";
import {
  Avatar,
  Button,
  Container,
  DropdownMenu,
  IconButton,
} from "@radix-ui/themes";
import { IconDotsVertical, IconPencil } from "@tabler/icons-react";
import Link from "next/link";
import { usePostHog } from "posthog-js/react";
import { useState } from "react";
import { FollowButton } from "../Shared/Profile/FollowButton";
import { ReportProfileDialog } from "../Shared/Profile/ReportProfileDialog";
import { UnfollowButton } from "../Shared/Profile/UnfollowButton";

interface ProfileHeaderProps {
  profile: Profile;
}

export const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
  const posthog = usePostHog();
  const { copyToClipboard } = useCopyToClipboard();
  const { data: session } = useSession();
  const [reportDialogOpen, setReportDialogOpen] = useState(false);

  const onCopyLink = () => {
    copyToClipboard(
      `${env.NEXT_PUBLIC_APP_URL}${Routes.userProfile({ username: profile.handle ? profile.handle.localName : profile.id })}`,
    );
    posthog.capture("profile_link_copied", {
      profileId: profile.id,
    });
  };

  const isCurrentUser =
    session?.type === SessionType.WithProfile &&
    session.profile.id === profile.id;
  const hasBanner = profile?.metadata?.coverPicture;

  return (
    <>
      <div
        className={cn("relative w-full  bg-gray-3", {
          "h-64 md:h-[22rem]": hasBanner,
          "h-32": !hasBanner,
        })}
      >
        {hasBanner ? (
          <img
            className="size-full object-cover"
            src={getProfileCoverUrl(profile)}
            alt="Banner"
            sizes="100vw"
          />
        ) : null}
      </div>

      <Container size="2" px="4">
        <div className="flex justify-between">
          <div className="z-10 mt-[-70px] rounded-5 border-[6px] border-white bg-white dark:border-gray-1">
            <Avatar
              src={getProfileAvatarUrl(profile)}
              fallback={profile.handle?.localName[0] || profile.id[0]}
              alt={getProfileHandle(profile)}
              size="8"
              radius="small"
            />
          </div>

          <div className="mt-4 flex items-center gap-4">
            {isCurrentUser ? (
              <Button color="gray" variant="soft" asChild>
                <Link href="/dashboard/settings">
                  Edit profile <IconPencil size={16} />
                </Link>
              </Button>
            ) : (
              <>
                {!profile.operations.isFollowedByMe.value ? (
                  <FollowButton profile={profile} />
                ) : (
                  <UnfollowButton profile={profile} />
                )}
              </>
            )}

            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <IconButton variant="ghost" color="gray" size="2">
                  <IconDotsVertical size={16} />
                </IconButton>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                align="end"
                variant="soft"
                color="gray"
                highContrast
              >
                <DropdownMenu.Item onClick={onCopyLink}>
                  Copy link to profile
                </DropdownMenu.Item>
                {session?.type === SessionType.WithProfile && !isCurrentUser ? (
                  <DropdownMenu.Item onClick={() => setReportDialogOpen(true)}>
                    Report profile
                  </DropdownMenu.Item>
                ) : null}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        </div>
      </Container>

      <ReportProfileDialog
        profile={profile}
        open={reportDialogOpen}
        onOpenChange={setReportDialogOpen}
      />
    </>
  );
};
