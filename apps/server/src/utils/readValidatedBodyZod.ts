import { formatZodError } from "@lens-protocol/metadata";
import type { H3Event } from "h3";
import type { z } from "zod";

export const readValidatedBodyZod = async <T, Event extends H3Event = H3Event>(
  event: Event,
  schema: z.ZodType<T>,
) => {
  const body = await readBody(event, { strict: true });
  const response = schema.safeParse(body);

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
