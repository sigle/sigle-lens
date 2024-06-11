import { getProfileAvatarUrl, getProfileHandle } from "@/lib/profile";
import {
  LimitType,
  type Post,
  PublicationMetadataMainFocusType,
  PublicationType,
  usePublications,
} from "@lens-protocol/react-web";
import { Avatar, Badge, Container, Flex, Text } from "@radix-ui/themes";
import { PublicationCard } from "../Shared/Publication/Card/PublicationCard";

interface PublicationAuthorSectionProps {
  publication: Post;
}

export const PublicationAuthorSection = ({
  publication,
}: PublicationAuthorSectionProps) => {
  const {
    data: publications,
    // TODO loading
    // loading,
    // TODO error
    // error,
  } = usePublications({
    limit: LimitType.Ten,
    where: {
      from: [publication.by.id],
      publicationTypes: [PublicationType.Post],
      metadata: {
        mainContentFocus: [PublicationMetadataMainFocusType.Article],
      },
    },
  });

  // Limit to 3 and remove the current viewed one
  const filteredPublications =
    publications?.filter((pub) => pub.id !== publication.id).slice(0, 3) ?? [];

  return (
    <div className="border-t border-solid border-gray-4 bg-gray-1 pt-16">
      <Container size="2" px="4" pb="9">
        <div className="space-y-3">
          <Avatar
            src={getProfileAvatarUrl(publication.by)}
            fallback={
              publication.by.handle?.localName[0] || publication.by.id[0]
            }
            alt={getProfileHandle(publication.by)}
            size="6"
          />

          <Flex gap="2" direction="row" align="center">
            <Text as="div" size="6" weight="medium">
              Written by{" "}
              {publication.by.metadata?.displayName
                ? publication.by.metadata?.displayName
                : null}
            </Text>
            <Badge variant="soft" color="gray">
              {getProfileHandle(publication.by)}
            </Badge>
          </Flex>

          {/* TODO format bio markdown limited */}
          {publication.by.metadata?.bio ? (
            <Text as="p" color="gray" size="2">
              {publication.by.metadata.bio}
            </Text>
          ) : null}
        </div>

        {filteredPublications.length > 0 ? (
          <>
            <Text as="div" mt="8" size="6" weight="medium">
              Read more
            </Text>
            <Flex direction="column">
              {filteredPublications.map((publication) => (
                <PublicationCard
                  key={publication.id}
                  publication={publication as Post}
                />
              ))}
            </Flex>
          </>
        ) : null}
      </Container>
    </div>
  );
};
