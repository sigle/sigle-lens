import { db } from "~/db/db";
import { posts } from "~/db/schema";

defineRouteMeta({
  openAPI: {
    tags: ["posts"],
    description: "Create a new post for the current profile.",
    responses: {
      default: {
        description: "Post created.",
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

export default defineEventHandler(async (event) => {
  const insertedPosts = await db
    .insert(posts)
    .values({
      profileId: event.context.user.profileId,
      title: "",
      content: "",
    })
    .returning();
  const insertedPost = insertedPosts[0];

  event.context.$posthog.capture({
    distinctId: event.context.user.userId,
    event: "post created",
    properties: {
      postId: insertedPost.id,
      profileId: event.context.user.profileId,
    },
  });

  return insertedPost;
});
