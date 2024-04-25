import {
  Avatar,
  Badge,
  Button,
  Card,
  Flex,
  Heading,
  Spinner,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";
import {
  LimitType,
  Post,
  Profile,
  PublicationType,
  usePublications,
} from "@lens-protocol/react-web";
import { format } from "date-fns";
import { PublicationMetadataMainFocusType } from "@lens-protocol/client";
import { getProfileAvatarUrl, getProfileHandle } from "@/lib/profile";
import { getOpenActionModule } from "@/lib/collect";
import { Routes } from "@/lib/routes";

interface LatestPublicationProps {
  profile: Profile;
}

export const LatestPublication = ({ profile }: LatestPublicationProps) => {
  const { data: publications, loading } = usePublications({
    limit: LimitType.Ten,
    where: {
      from: [profile.id],
      publicationTypes: [PublicationType.Post],
      metadata: {
        mainContentFocus: [PublicationMetadataMainFocusType.Article],
      },
    },
  });
  const publication = publications?.[0] as Post | undefined;

  const metadata =
    publication?.metadata.__typename === "ArticleMetadataV3"
      ? publication.metadata
      : null;

  const metaTitleAttribute = metadata?.attributes?.find(
    (attribute) => attribute.key === "meta-title"
  );

  const openActionModule = publication
    ? getOpenActionModule(publication)
    : undefined;

  return (
    <div>
      <Flex justify="between" align="center">
        <Text size="2">Latest publication</Text>
      </Flex>
      <Card mt="2" size="2">
        {loading ? (
          <Flex justify="center" py="7">
            <Spinner />
          </Flex>
        ) : null}

        {!loading && !publication ? (
          <Flex justify="center" py="7">
            <Text size="2" color="gray">
              No publication yet
            </Text>
          </Flex>
        ) : null}

        {publication ? (
          <>
            <div className="bg-[--gray-2] px-3 py-2">
              <Heading size="4" className="line-clamp-2">
                {metaTitleAttribute?.value || metadata?.title}
              </Heading>
              <Flex mt="2" justify="between" align="center">
                <Flex align="center" gap="1">
                  <Avatar
                    src={getProfileAvatarUrl(publication.by)}
                    fallback={
                      publication.by.handle?.localName[0] ||
                      publication.by.id[0]
                    }
                    alt={getProfileHandle(publication.by)}
                    size="1"
                  />
                  {publication.by.metadata ? (
                    <Text size="1">{publication.by.metadata.displayName}</Text>
                  ) : null}
                  <Badge variant="soft" color="gray">
                    {getProfileHandle(publication.by)}
                  </Badge>
                </Flex>
              </Flex>
              <Text mt="2" as="p" color="gray" size="1" className="uppercase">
                {format(new Date(publication.createdAt), "MMM dd")}
              </Text>
              <Button
                mt="3"
                color="gray"
                highContrast
                size="3"
                className="w-full"
                asChild
              >
                <Link href={Routes.publication({ id: publication.id })}>
                  View story
                </Link>
              </Button>
            </div>

            <div className="mt-5">
              {openActionModule && openActionModule.amount.value !== "0" ? (
                <Flex
                  gap="5"
                  align="center"
                  justify="between"
                  className="border-b border-solid border-gray-6 py-5 last:border-b-0"
                >
                  <Text size="2">Earned</Text>
                  <Text size="2" weight="medium">
                    {(
                      Number(openActionModule.amount.value) *
                      publication.stats.collects
                    ).toFixed(2)}{" "}
                    <Text size="1" color="gray">
                      {openActionModule?.amount.asset.symbol}
                    </Text>
                  </Text>
                </Flex>
              ) : null}
              {openActionModule ? (
                <Flex
                  gap="5"
                  align="center"
                  justify="between"
                  className="border-b border-solid border-gray-6 py-5 last:border-b-0"
                >
                  <Text size="2">Collected</Text>
                  <Text size="2" weight="medium">
                    {publication.stats.collects}
                  </Text>
                </Flex>
              ) : null}
              <Flex
                gap="5"
                align="center"
                justify="between"
                className="border-b border-solid border-gray-6 py-5 last:border-b-0"
              >
                <Text size="2">Mirrored</Text>
                <Text size="2" weight="medium">
                  {publication.stats.mirrors}
                </Text>
              </Flex>
              <Flex
                gap="5"
                align="center"
                justify="between"
                className="border-b border-solid border-gray-6 py-5 last:border-b-0"
              >
                <Text size="2">Liked</Text>
                <Text size="2" weight="medium">
                  {publication.stats.upvotes}
                </Text>
              </Flex>
              <Flex
                gap="5"
                align="center"
                justify="between"
                className="border-b border-solid border-gray-6 py-5 last:border-b-0"
              >
                <Text size="2">Commented</Text>
                <Text size="2" weight="medium">
                  {publication.stats.comments}
                </Text>
              </Flex>
            </div>
          </>
        ) : null}
      </Card>
    </div>
  );
};
