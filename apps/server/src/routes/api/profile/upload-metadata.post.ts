import { ProfileMetadataSchema } from "@lens-protocol/metadata";
import { aerweaveUploadFile } from "~/utils/aerweave";

defineRouteMeta({
  openAPI: {
    tags: ["profile"],
    description: "Upload profile metadata to Arweave.",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              metadata: {
                type: "object",
                description: "Profile metadata",
              },
            },
          },
        },
      },
    },
    responses: {
      default: {
        description: "Metadata uploaded",
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["id"],
              properties: {
                id: {
                  type: "string",
                  description: "Arweave transaction ID",
                },
              },
            },
          },
        },
      },
    },
  },
});

export default defineEventHandler(async (event) => {
  // TODO rate limit route 2 / minute / user
  const body = await readBody(event);

  // Validate metadata against the Lens schema
  const parsedMetadata = ProfileMetadataSchema.safeParse(body.metadata);
  if (!parsedMetadata.success) {
    throw createError({
      status: 400,
      message: "Invalid metadata",
    });
  }

  const { id } = await aerweaveUploadFile(event, {
    metadata: parsedMetadata.data,
  });

  event.context.$posthog.capture({
    distinctId: event.context.user.userId,
    event: "metadata uploaded",
    properties: {
      profileId: event.context.user.profileId,
      arweaveTxId: id,
      type: "profile",
    },
  });

  return { id };
});
