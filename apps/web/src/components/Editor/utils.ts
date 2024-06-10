import type { PostsServiceGetApiPostsByPostIdDefaultResponse } from "@/__generated__/opanapi/queries";
import { env } from "@/env";
import { resolveImageUrl } from "@/lib/resolve-image-url";
import {
  type ArticleMetadata,
  type MediaImage,
  MediaImageMimeType,
  type MetadataAttribute,
  MetadataAttributeType,
  type URI,
  article,
} from "@lens-protocol/metadata";
import {
  Amount,
  type CollectActionConfig,
  type Erc20,
  OpenActionType,
  type Post,
} from "@lens-protocol/react-web";
import type { Editor } from "@tiptap/core";
import type { EditorPostFormData } from "./EditorFormProvider";

export const serializeLensPostToDraft = (
  publication: Post,
): PostsServiceGetApiPostsByPostIdDefaultResponse => {
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
    metaTitle:
      publication.metadata.attributes?.find(
        (attribute) => attribute.key === "meta-title",
      )?.value || undefined,
    metaDescription:
      publication.metadata.attributes?.find(
        (attribute) => attribute.key === "meta-description",
      )?.value || undefined,
    coverImage:
      publication.metadata.attachments?.[0] &&
      publication.metadata.attachments[0].__typename ===
        "PublicationMetadataMediaImage"
        ? publication.metadata.attachments[0].image.raw.uri
        : undefined,
  };
};

const generateLensMetadataAttributesFromForm = ({
  editor,
  post,
}: {
  editor?: Editor;
  post: EditorPostFormData;
}): MetadataAttribute[] => {
  const attributes: MetadataAttribute[] = [
    // Generate an excerpt from the content that can be used as the description in the publication cards
    {
      type: MetadataAttributeType.STRING,
      value: editor?.getText().slice(0, 350) || "",
      key: "excerpt",
    },
  ];
  if (post.metaTitle) {
    attributes.push({
      type: MetadataAttributeType.STRING,
      value: post.metaTitle,
      key: "meta-title",
    });
  }
  if (post.metaDescription) {
    attributes.push({
      type: MetadataAttributeType.STRING,
      value: post.metaDescription,
      key: "meta-description",
    });
  }

  return attributes;
};

const generateLensMetadataAttachmentsFromForm = async ({
  post,
}: {
  post: EditorPostFormData;
}): Promise<MediaImage[]> => {
  const attachments: MediaImage[] = [];
  if (post.coverImage) {
    const response = await fetch(resolveImageUrl(post.coverImage));
    const blob = await response.blob();
    let type: MediaImageMimeType | null = null;
    switch (blob.type) {
      case "image/jpeg":
        type = MediaImageMimeType.JPEG;
        break;
      case "image/png":
        type = MediaImageMimeType.PNG;
        break;
      case "image/webp":
        type = MediaImageMimeType.WEBP;
    }
    if (!type) {
      throw new Error(`Cover image type "${blob.type}" is not supported`);
    }
    attachments.push({
      type,
      item: post.coverImage as URI,
    });
  }
  return attachments;
};

export const generateLensMetadataFromForm = async ({
  editor,
  postId,
  post,
}: {
  editor?: Editor;
  postId: string;
  post: EditorPostFormData;
}): Promise<ArticleMetadata> => {
  const metadataAttributes = generateLensMetadataAttributesFromForm({
    editor,
    post,
  });
  const metadataAttachments = await generateLensMetadataAttachmentsFromForm({
    post,
  });

  let description =
    metadataAttributes.find((attribute) => attribute.key === "excerpt")
      ?.value || "";
  description = `${description}...\n\nWritten on www.sigle.io`;

  const metadata = article({
    title: post.title,
    content: post.content,
    locale: "en",
    // TODO add tags to the editor
    tags: [],
    // We return an empty array as the SDK is expecting at least one attachment if the field is defined
    attributes: metadataAttributes.length > 0 ? metadataAttributes : undefined,
    // We return an empty array as the SDK is expecting at least one attachment if the field is defined
    attachments:
      metadataAttachments.length > 0 ? metadataAttachments : undefined,
    marketplace: {
      name: post.title,
      description,
      external_url: `${env.NEXT_PUBLIC_APP_URL}/p/${postId}`,
      image: `${env.NEXT_PUBLIC_APP_URL}/api/post/${postId}/nft-image`,
    },
    appId: env.NEXT_PUBLIC_LENS_APP_ID,
  });

  return metadata;
};

export const generateLensActionsFromForm = ({
  currencies,
  post,
  address,
}: {
  currencies: Erc20[];
  post: EditorPostFormData;
  address: string;
}): CollectActionConfig => {
  const currency = currencies.find(
    (currency) => currency.address === post.collect.currency,
  );
  const collectLimit =
    post.collect.collectLimit?.enabled === true &&
    post.collect.collectLimit.limit
      ? post.collect.collectLimit.limit
      : undefined;

  // TODO should we always do Multirecipient collect and just add one user with 100% split?
  let action: CollectActionConfig = {
    type: OpenActionType.SIMPLE_COLLECT,
    amount:
      currency && post.collect.price && post.collect.price > 0
        ? Amount.erc20(currency, post.collect.price)
        : undefined,
    recipient: address,
    followerOnly: false,
    collectLimit,
    referralFee:
      post.collect.referralFee?.enabled === true
        ? post.collect.referralFee.reward
        : 0,
  };

  if (
    post.collect.recipients?.enabled === true &&
    currency &&
    post.collect.price
  ) {
    action = {
      ...action,
      type: OpenActionType.MULTIRECIPIENT_COLLECT,
      amount: Amount.erc20(currency, post.collect.price),
      recipients: post.collect.recipients.recipients.map((recipient) => ({
        recipient: recipient.recipient,
        split: recipient.split,
      })),
    };
  }

  return action;
};
