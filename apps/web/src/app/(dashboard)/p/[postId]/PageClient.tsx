"use client";
import { PublicationAuthorSection } from "@/components/Publication/AuthorSection";
import { PublicationCollectCard } from "@/components/Publication/CollectCard";
import { PublicationInfoCard } from "@/components/Publication/InfoCard";
import { PublicationMarkdownContent } from "@/components/Publication/MarkdownContent";
import { PublishedDialog } from "@/components/Publication/PublishedDialog";
import { PublicationBookmark } from "@/components/Shared/Publication/PublicationBookmark";
import { PublicationCollect } from "@/components/Shared/Publication/PublicationCollect";
import { PublicationLike } from "@/components/Shared/Publication/PublicationLike";
import { PublicationReportDialog } from "@/components/Shared/Publication/PublicationReportDialog";
import { PublicationShareDialog } from "@/components/Shared/Publication/PublicationShareDialog";
import { FadeSlideBottom } from "@/components/ui/animations/FadeSlideBottom";
import { getOpenActionModule } from "@/lib/collect";
import { getProfileAvatarUrl, getProfileHandle } from "@/lib/profile";
import { resolveImageUrl } from "@/lib/resolve-image-url";
import { Routes } from "@/lib/routes";
import { type PublicationId, usePublication } from "@lens-protocol/react-web";
import {
  Avatar,
  Badge,
  Callout,
  Container,
  DropdownMenu,
  Flex,
  Heading,
  IconButton,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import {
  IconDotsVertical,
  IconInfoCircle,
  IconShare,
} from "@tabler/icons-react";
import { format } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";
import { PagePostSkeleton } from "./loading";

type Props = {
  params: { postId: string };
};

export function PostClient({ params }: Props) {
  const {
    data: publication,
    loading: publicationLoading,
    error: publicationError,
  } = usePublication({
    forId: params.postId as PublicationId,
  });
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  if (publicationError) {
    return (
      <Container size="2" mt="8" px="4" pb="6">
        <Callout.Root color="red" mt="4">
          <Callout.Icon>
            <IconInfoCircle />
          </Callout.Icon>
          <Callout.Text>
            Failed to load publication. Error: {publicationError.message}
          </Callout.Text>
        </Callout.Root>
      </Container>
    );
  }

  if (publicationLoading) {
    return <PagePostSkeleton />;
  }

  if (
    !publication ||
    publication.__typename !== "Post" ||
    publication.metadata.__typename !== "ArticleMetadataV3"
  ) {
    notFound();
  }

  const openActionModule = getOpenActionModule(publication);
  const coverImageAttribute =
    publication.metadata.attachments?.[0] &&
    publication.metadata.attachments[0].__typename ===
      "PublicationMetadataMediaImage"
      ? publication.metadata.attachments[0]
      : null;

  return (
    <FadeSlideBottom>
      <Container size="2" mt="8" px="4" pb="9">
        <Heading size="8">{publication.metadata.title}</Heading>

        <Link
          href={Routes.userProfile({
            username: publication.by.handle
              ? publication.by.handle.localName
              : publication.by.id,
          })}
        >
          <div className="mt-8 flex items-center gap-2">
            <Avatar
              src={getProfileAvatarUrl(publication.by)}
              fallback={
                publication.by.handle?.localName[0] || publication.by.id[0]
              }
              alt={getProfileHandle(publication.by)}
              size="4"
            />
            <Flex gap="1" direction="column">
              <Flex gap="2" direction="row">
                {publication.by.metadata?.displayName ? (
                  <Text size="2">{publication.by.metadata?.displayName}</Text>
                ) : null}
                <Badge variant="soft" color="gray">
                  {getProfileHandle(publication.by)}
                </Badge>
              </Flex>
              <Text as="p" color="gray" size="1" className="uppercase">
                {format(new Date(publication.createdAt), "MMM dd, yyyy")}
              </Text>
            </Flex>
          </div>
        </Link>

        <div className="mt-5 flex items-center justify-between gap-4 border-y border-solid border-gray-6 py-4">
          <Flex gap="4" align="center">
            <PublicationLike publication={publication} />
            <PublicationBookmark publication={publication} />
            <Tooltip content={"Share"}>
              <IconButton
                variant="ghost"
                color="gray"
                size="1"
                onClick={() => setShareDialogOpen(true)}
              >
                <IconShare size={16} />
              </IconButton>
            </Tooltip>
            <DropdownMenu.Root>
              <Tooltip content="More">
                <DropdownMenu.Trigger>
                  <IconButton variant="ghost" color="gray" size="1">
                    <IconDotsVertical size={16} />
                  </IconButton>
                </DropdownMenu.Trigger>
              </Tooltip>
              <DropdownMenu.Content variant="soft" color="gray" highContrast>
                <DropdownMenu.Item onClick={() => setReportDialogOpen(true)}>
                  Report
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Flex>
          {openActionModule ? (
            <PublicationCollect publication={publication} />
          ) : null}
        </div>

        {coverImageAttribute ? (
          <img
            src={resolveImageUrl(
              coverImageAttribute.image.optimized?.uri ||
                coverImageAttribute.image.raw.uri,
            )}
            alt="Cover post"
            className="mt-8 size-full rounded-2 object-cover"
          />
        ) : null}

        {publication.metadata.content ? (
          <PublicationMarkdownContent content={publication.metadata.content} />
        ) : null}

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {openActionModule ? (
            <PublicationCollectCard
              publication={publication}
              openActionModule={openActionModule}
            />
          ) : null}
          <PublicationInfoCard publication={publication} />
        </div>

        <PublicationReportDialog
          publication={publication}
          open={reportDialogOpen}
          onOpenChange={setReportDialogOpen}
        />
        <PublicationShareDialog
          publication={publication}
          open={shareDialogOpen}
          onOpenChange={setShareDialogOpen}
        />
        <PublishedDialog onShare={() => setShareDialogOpen(true)} />
      </Container>

      <PublicationAuthorSection publication={publication} />
    </FadeSlideBottom>
  );
}
