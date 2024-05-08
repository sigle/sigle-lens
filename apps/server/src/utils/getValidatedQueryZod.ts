import { formatZodError } from "@lens-protocol/metadata";
import { H3Event } from "h3";
import { z } from "zod";

export const getValidatedQueryZod = async <T, Event extends H3Event = H3Event>(
  event: Event,
  schema: z.ZodType<T>
) => {
  const query = getQuery(event);
  const response = schema.safeParse(query);

  if (!response.success) {
    throw createError({
      status: 400,
      statusMessage: "Validation Error",
      message: formatZodError(response.error),
      data: response.error,
    });
  }

  return response.data;
};
