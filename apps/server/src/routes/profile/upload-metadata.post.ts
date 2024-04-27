import { ProfileMetadataSchema } from "@lens-protocol/metadata";
import { aerweaveUploadFile } from "~/utils/aerweave";

export default defineEventHandler(async (event) => {
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
      txId: id,
      type: "profile",
    },
  });

  return { id };
});
