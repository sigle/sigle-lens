import type { H3Event } from "h3";
import Irys from "@irys/sdk";
import { env } from "~/env";

interface ArweaveTag {
  name: string;
  value: string;
}

const irys = new Irys({
  network: "mainnet",
  token: "matic",
  key: env.IRYS_PRIVATE_KEY,
});

export const aerweaveUploadFile = async (
  event: H3Event,
  {
    metadata,
  }: {
    metadata: object;
  }
) => {
  const arweaveTags: ArweaveTag[] = [
    {
      name: "content-type",
      value: "application/json",
    },
    {
      name: "App-Name",
      value: env.LENS_APP_ID,
    },
  ];

  try {
    const response = await irys.upload(JSON.stringify(metadata), {
      tags: arweaveTags,
    });

    return { id: response.id };
  } catch (error) {
    event.context.$sentry.captureException(error, {
      level: "error",
      extra: {
        metadata,
      },
    });
    throw createError({
      status: 500,
      message: "Failed to upload to Arweave",
    });
  }
};
