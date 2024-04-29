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
      404: {
        description: "Post not found.",
      },
    },
  },
});

export default defineEventHandler((event) => {
  const postId = getRouterParam(event, "postId");

  return { id: "todo" };
});
