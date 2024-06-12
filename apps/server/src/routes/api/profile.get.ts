import { eq } from "drizzle-orm";
import { db } from "~/db/db";
import { profiles } from "~/db/schema";

defineRouteMeta({
  openAPI: {
    tags: ["profile"],
    description: "Return the current user profile.",
    responses: {
      default: {
        description: "User Profile",
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["id", "whitelisted"],
              properties: {
                id: {
                  type: "string",
                },
                whitelisted: {
                  type: "boolean",
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
  const profile = db
    .select({
      id: profiles.id,
      whitelist: profiles.whitelisted,
    })
    .from(profiles)
    .where(eq(profiles.id, event.context.user.profileId))
    .then((rows) => rows[0]);

  return profile;
});
