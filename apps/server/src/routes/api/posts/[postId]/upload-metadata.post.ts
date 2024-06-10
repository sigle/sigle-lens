import { ArticleSchema, formatZodError } from "@lens-protocol/metadata";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/db/db";
import { posts } from "~/db/schema";
import { readValidatedBodyZod } from "~/utils/readValidatedBodyZod";

defineRouteMeta({
  openAPI: {
    tags: ["posts"],
    description: "Upload post metadata to Arweave.",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["metadata"],
            properties: {
              metadata: {
                type: "object",
              },
            },
          },
        },
      },
    },
    responses: {
      default: {
        description: "Metadata uploaded.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["id"],
              properties: {
                id: {
                  description: "Arweave ID.",
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
});

const uploadMetadataPostSchema = z.object({
  metadata: z.any(),
});

export default defineEventHandler(async (event) => {
  const postId = getRouterParam(event, "postId");
  const body = await readValidatedBodyZod(event, uploadMetadataPostSchema);

  const post = db
    .select({
      id: posts.id,
    })
    .from(posts)
    .where(
      and(
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        eq(posts.id as any, postId),
        eq(posts.profileId, event.context.user.profileId),
      ),
    )
    .then((rows) => rows[0]);
  if (!post) {
    throw createError({
      status: 404,
      message: "Post not found.",
    });
  }

  const parsedMetadata = ArticleSchema.safeParse(body.metadata);
  if (!parsedMetadata.success) {
    throw createError({
      status: 400,
      message: `Invalid metadata: ${formatZodError(parsedMetadata.error)}`,
    });
  }

  const { id } = await aerweaveUploadFile(event, {
    metadata: parsedMetadata.data,
  });

  return { id };
});
