import { FleekSdk, PersonalAccessTokenService } from "@fleek-platform/sdk";
import { env } from "~/env";

const newAccessTokenService = new PersonalAccessTokenService({
  personalAccessToken: env.FLEEK_API_KEY,
  projectId: env.FLEEK_PROJECT_ID,
});

const fleekSdk = new FleekSdk({
  accessTokenService: newAccessTokenService,
});

export async function uploadImage({
  path,
  content,
}: {
  path: string;
  content: Buffer;
}) {
  const result = await fleekSdk.ipfs().add({
    path,
    content,
  });
  return result;
}
