import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/db/db";
import { posts } from "~/db/schema";
import { getValidatedQueryZod } from "~/utils/getValidatedQueryZod";

defineRouteMeta({
  openAPI: {
    tags: ["posts"],
    description: "Get posts for the current profile.",
    parameters: [
      {
        in: "query",
        name: "limit",
        schema: {
          type: "integer",
          minimum: 1,
          maximum: 100,
        },
        description: "Limit the number of posts returned.",
      },
    ],
    responses: {
      default: {
        description: "Posts list.",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
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
                  updatedAt: {
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

const listQuerySchema = z.object({
  limit: z.coerce.number().min(1).max(100),
});

export default defineEventHandler(async (event) => {
  const query = await getValidatedQueryZod(event, listQuerySchema);

  const postsList = await db
    .select({
      id: posts.id,
      title: posts.title,
      content: posts.content,
      metaTitle: posts.metaTitle,
      metaDescription: posts.metaDescription,
      coverImage: posts.coverImage,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
    })
    .from(posts)
    .where(eq(posts.profileId, event.context.user.profileId))
    .orderBy(desc(posts.updatedAt))
    .limit(query.limit);

  return postsList;
});
