import { and, eq } from "drizzle-orm";
import { db } from "~/db/db";
import { posts } from "~/db/schema";

defineRouteMeta({
  openAPI: {
    tags: ["posts"],
    description: "Get posts for the current profile.",
    responses: {
      default: {
        description: "Posts list.",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                type: "object",
                required: ["id", "title"],
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
        eq(posts.id as any, postId),
        eq(posts.profileId, event.context.user.profileId)
      )
    )
    .then((rows) => rows[0]);

  return post;
});
