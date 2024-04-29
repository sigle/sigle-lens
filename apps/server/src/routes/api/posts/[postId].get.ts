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

export default defineEventHandler((event) => {
  const postId = getRouterParam(event, "postId");

  const post = db
    .select({
      id: posts.id,
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
