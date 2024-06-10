import { PublicationBookmark } from "@/components/Publication/PublicationBookmark";
import { PublicationHideDialog } from "@/components/Publication/PublicationHideDialog";
import { PublicationLike } from "@/components/Publication/PublicationLike";
import { getOpenActionModule } from "@/lib/collect";
import { invariant } from "@/lib/invariant";
import { getProfileAvatarUrl, getProfileHandle } from "@/lib/profile";
import { resolveImageUrl } from "@/lib/resolve-image-url";
import { Routes } from "@/lib/routes";
import { type Post, SessionType, useSession } from "@lens-protocol/react-web";
import {
  AspectRatio,
  Avatar,
  Badge,
  DropdownMenu,
  Flex,
  Heading,
  IconButton,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import { IconDotsVertical } from "@tabler/icons-react";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";

interface PublicationCardProps {
  publication: Post;
}

export const PublicationCard = ({ publication }: PublicationCardProps) => {
  const { data: session } = useSession();
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [hideDialogOpen, setHideDialogOpen] = useState(false);

  // Get the correct metadata type to get proper typechecking
  const metadata =
    publication.metadata.__typename === "ArticleMetadataV3"
      ? publication.metadata
      : null;

  invariant(metadata, "metadata should be defined");

  const excerptAttribute = metadata.attributes?.find(
    (attribute) => attribute.key === "excerpt",
  );
  const metaTitleAttribute = metadata.attributes?.find(
    (attribute) => attribute.key === "meta-title",
  );
  const metaDescriptionAttribute = metadata.attributes?.find(
    (attribute) => attribute.key === "meta-description",
  );
  const coverImageAttribute =
    metadata.attachments?.[0] &&
    metadata.attachments[0].__typename === "PublicationMetadataMediaImage"
      ? metadata.attachments[0]
      : null;
  const openActionModule = getOpenActionModule(publication);

  return (
    <div className="space-y-3 border-b border-solid border-gray-6 py-5 last:border-b-0">
      <Text as="p" color="gray" size="1" className="uppercase">
        {format(new Date(publication.createdAt), "MMM dd, yyyy")}
      </Text>

      <Flex justify="between" align="center">
        <Link
          href={Routes.userProfile({
            username: publication.by.handle
              ? publication.by.handle.localName
              : publication.by.id,
          })}
        >
          <div className="flex gap-3">
            <Avatar
              src={getProfileAvatarUrl(publication.by)}
              fallback={
                publication.by.handle?.localName[0] || publication.by.id[0]
              }
              alt={getProfileHandle(publication.by)}
              size="2"
            />
            <div className="space-y-1">
              {publication.by.metadata ? (
                <Text as="div" size="1" weight="medium">
                  {publication.by.metadata.displayName}
                </Text>
              ) : null}
              <Text as="div" color="gray" size="1">
                @{getProfileHandle(publication.by)}
              </Text>
            </div>
          </div>
        </Link>
      </Flex>

      <div className="space-y-5">
        <Link
          href={Routes.publication({ id: publication.id })}
          className="block"
        >
          <Flex gap="5" align="start" justify="between">
            <div className="flex-1 space-y-2">
              <Heading
                size="4"
                className="line-clamp-2 break-words"
                style={{
                  wordBreak: "break-word",
                }}
              >
                {metaTitleAttribute?.value || metadata?.title}
              </Heading>
              <Text as="p" size="2" className="line-clamp-1 md:line-clamp-3">
                {metaDescriptionAttribute?.value || excerptAttribute?.value}
              </Text>
            </div>
            {coverImageAttribute ? (
              <div className="w-[100px] max-w-full overflow-hidden md:w-[180px]">
                <AspectRatio ratio={16 / 10}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={resolveImageUrl(
                      coverImageAttribute.image.optimized?.uri ||
                        coverImageAttribute.image.raw.uri,
                    )}
                    alt="Cover card"
                    className="size-full rounded-2 object-cover"
                  />
                </AspectRatio>
              </div>
            ) : null}
          </Flex>
        </Link>

        <Flex gap="4" align="center">
          <PublicationLike publication={publication} />
          <PublicationBookmark publication={publication} />
          <DropdownMenu.Root>
            <Tooltip content="More">
              <DropdownMenu.Trigger>
                <IconButton variant="ghost" color="gray" size="1">
                  <IconDotsVertical size={16} />
                </IconButton>
              </DropdownMenu.Trigger>
            </Tooltip>
            <DropdownMenu.Content variant="soft" color="gray" highContrast>
              {session?.type === SessionType.WithProfile &&
              session.profile.id === publication.by.id ? (
                <DropdownMenu.Item asChild>
                  <Link href={`/p/${publication.id}/edit`}>Edit</Link>
                </DropdownMenu.Item>
              ) : null}
              {session?.type === SessionType.WithProfile &&
              session.profile.id === publication.by.id ? (
                <DropdownMenu.Item onClick={() => setHideDialogOpen(true)}>
                  Hide
                </DropdownMenu.Item>
              ) : null}
              <DropdownMenu.Item onClick={() => setShareDialogOpen(true)}>
                Share
              </DropdownMenu.Item>
              {session?.type === SessionType.WithProfile ? (
                <DropdownMenu.Item onClick={() => setReportDialogOpen(true)}>
                  Report
                </DropdownMenu.Item>
              ) : null}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          {/* {openActionModule ? (
            <div className="ml-5">
              <PublicationCollect publication={publication} />
            </div>
          ) : null} */}
        </Flex>
      </div>

      {/* <PublicationReportDialog
        publication={publication}
        open={reportDialogOpen}
        onOpenChange={setReportDialogOpen}
      />
      <PublicationShareDialog
        publication={publication}
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
      /> */}
      <PublicationHideDialog
        publication={publication}
        open={hideDialogOpen}
        onOpenChange={setHideDialogOpen}
      />
    </div>
  );
};
