import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/db/db";
import { posts } from "~/db/schema";
import { readValidatedBodyZod } from "~/utils/readValidatedBodyZod";

defineRouteMeta({
  openAPI: {
    tags: ["posts"],
    description: "Update the post for the current profile.",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["title", "content"],
            properties: {
              title: {
                type: "string",
              },
              content: {
                type: "string",
              },
              metaTitle: {
                type: "string",
              },
              metaDescription: {
                type: "string",
              },
              coverImage: {
                type: "string",
              },
            },
          },
        },
      },
    },
    responses: {
      default: {
        description: "Post updated.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["id"],
              properties: {
                id: {
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

const updatePostSchema = z.object({
  title: z.string(),
  content: z.string(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  coverImage: z.string().optional(),
});

export default defineEventHandler(async (event) => {
  const postId = getRouterParam(event, "postId");
  const body = await readValidatedBodyZod(event, updatePostSchema);

  const updatedPosts = await db
    .update(posts)
    .set({
      title: body.title,
      content: body.content,
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription,
      coverImage: body.coverImage,
    })
    .where(
      and(
        eq(posts.id as any, postId),
        eq(posts.profileId, event.context.user.profileId)
      )
    )
    .returning();
  const updatedPost = updatedPosts[0];

  return updatedPost;
});
