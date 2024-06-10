import { nanoid } from "nanoid";
import { z } from "zod";
import { env } from "~/env";
import { uploadImage } from "~/utils/fleek";
import {
  allowedFormats,
  mimeTypeToExtension,
  optimizeImage,
} from "~/utils/image";

defineRouteMeta({
  openAPI: {
    tags: ["posts"],
    description: "Upload media for a post.",
    requestBody: {
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            properties: {
              file: {
                type: "string",
                format: "binary",
                description: "Profile media",
              },
            },
            required: ["file"],
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
              required: ["cid", "url", "gatewayUrl"],
              properties: {
                cid: { type: "string" },
                url: { type: "string" },
                gatewayUrl: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
});

const fileSchema = z.object({
  name: z.string(),
  filename: z.string(),
  type: z.enum(allowedFormats),
});

export default defineEventHandler(async (event) => {
  // TODO limit file size
  // TODO rate limit route 10 / minute / user
  const postId = getRouterParam(event, "postId");
  const formData = await readMultipartFormData(event);

  const file = formData?.find((f) => f.name === "file");
  if (!file) {
    throw createError({
      status: 400,
      message: "No file provided",
    });
  }

  const parsedFile = fileSchema.safeParse(file);
  if (!parsedFile.success) {
    throw createError({
      status: 400,
      message: "Invalid file",
    });
  }

  const optimizedBuffer = await optimizeImage({
    buffer: file.data,
    contentType: parsedFile.data.type,
    quality: 75,
    width: 600,
  });

  const { cid, size } = await uploadImage({
    path: `${event.context.user.profileId}/post-${postId}/${nanoid()}.${mimeTypeToExtension(parsedFile.data.type)}`,
    content: optimizedBuffer,
  });

  event.context.$posthog.capture({
    distinctId: event.context.user.userId,
    event: "post media uploaded",
    properties: {
      profileId: event.context.user.profileId,
      postId,
      cid,
      size,
    },
  });

  return {
    cid,
    url: `ipfs://${cid}`,
    gatewayUrl: `${env.IPFS_GATEWAY_URL}/ipfs/${cid}`,
  };
});
