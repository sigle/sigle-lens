import type { PostFragment } from "@lens-protocol/client";
import type { Post } from "@lens-protocol/react-web";

export const serializeLensPost = (publication: Post | PostFragment) => {
  if (publication.metadata.__typename !== "ArticleMetadataV3") {
    throw new Error(
      `Unsupported metadata type ${publication.metadata.__typename}`,
    );
  }

  return {
    id: publication.id,
    title: publication.metadata.title,
    content: publication.metadata.content,
    createdAt: publication.createdAt,
    excerpt:
      publication.metadata.attributes?.find(
        (attribute) => attribute.key === "excerpt",
      )?.value || null,
    metaTitle:
      publication.metadata.attributes?.find(
        (attribute) => attribute.key === "meta-title",
      )?.value || null,
    metaDescription:
      publication.metadata.attributes?.find(
        (attribute) => attribute.key === "meta-description",
      )?.value || null,
    coverImage:
      publication.metadata.attachments?.[0] &&
      publication.metadata.attachments[0].__typename ===
        "PublicationMetadataMediaImage"
        ? publication.metadata.attachments[0].image.optimized
          ? publication.metadata.attachments[0].image.optimized.uri
          : publication.metadata.attachments[0].image.raw.uri
        : null,
  };
};
