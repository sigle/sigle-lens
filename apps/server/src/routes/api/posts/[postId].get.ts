import { and, eq } from "drizzle-orm";
import { db } from "~/db/db";
import { posts } from "~/db/schema";

defineRouteMeta({
  openAPI: {
    tags: ["posts"],
    description: "Get post for the current profile.",
    responses: {
      default: {
        description: "Post entry.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["id", "title", "createdAt"],
              properties: {
                id: {
                  type: "string",
                },
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
                createdAt: {
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

export default defineEventHandler((event) => {
  const postId = getRouterParam(event, "postId");

  const post = db
    .select({
      id: posts.id,
      title: posts.title,
      content: posts.content,
      metaTitle: posts.metaTitle,
      metaDescription: posts.metaDescription,
      coverImage: posts.coverImage,
      createdAt: posts.createdAt,
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

  return post;
});
