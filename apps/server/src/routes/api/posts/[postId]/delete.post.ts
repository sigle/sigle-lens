import { and, eq } from "drizzle-orm";
import { db } from "~/db/db";
import { posts } from "~/db/schema";

defineRouteMeta({
  openAPI: {
    tags: ["posts"],
    description: "Delete the post for the current profile.",
  },
});

export default defineEventHandler(async (event) => {
  const postId = getRouterParam(event, "postId");

  await db
    .delete(posts)
    .where(
      and(
        eq(posts.id as any, postId),
        eq(posts.profileId, event.context.user.profileId)
      )
    );

  event.context.$posthog.capture({
    distinctId: event.context.user.userId,
    event: "post deleted",
    properties: {
      postId,
      profileId: event.context.user.profileId,
    },
  });

  return true;
});
