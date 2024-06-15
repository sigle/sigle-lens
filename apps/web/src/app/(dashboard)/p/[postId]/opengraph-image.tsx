import { lensClient } from "@/lib/lens";
import { getProfileAvatarUrl, getProfileHandle } from "@/lib/profile";
import type { Profile } from "@lens-protocol/react-web";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 800,
  height: 418,
};

export const contentType = "image/png";

// Image generation
export default async function Image({
  params,
}: {
  params: { postId: string };
}) {
  const publication = await lensClient.publication.fetch({
    forId: params.postId,
  });

  if (
    !publication ||
    publication.__typename !== "Post" ||
    publication.metadata.__typename !== "ArticleMetadataV3"
  ) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  // Disable font loading for now as it's throwing an error when loading the local font
  // const interRegularPromise = fetch(
  //   new URL("@/assets/fonts/Inter-Regular.ttf", import.meta.url),
  // ).then((res) => res.arrayBuffer());
  // const interMediumPromise = fetch(
  //   new URL("@/assets/fonts/Inter-Medium.ttf", import.meta.url),
  // ).then((res) => res.arrayBuffer());

  // const [interRegular, interMedium] = await Promise.all([
  //   interRegularPromise,
  //   interMediumPromise,
  // ]);

  const profile = publication.by as unknown as Profile;
  const avatar = getProfileAvatarUrl(profile);
  const username = profile.metadata?.displayName;
  const handle = getProfileHandle(profile);

  return new ImageResponse(
    <div
      tw="flex h-full w-full flex-col items-start px-15 py-15 justify-between"
      style={{
        color: "#202020",
        backgroundColor: "#ffffff",
        fontFamily: '"Inter"',
      }}
    >
      <div
        tw="text-5xl leading-snug overflow-hidden"
        style={{
          display: "block",
          lineClamp: 3,
          fontWeight: 500,
        }}
      >
        {publication.metadata.title}
      </div>
      <div tw="flex w-full items-center justify-between">
        <div tw="flex items-center">
          <img
            tw="rounded-full"
            src={avatar}
            alt="avatar"
            height={50}
            width={50}
            style={{
              objectFit: "cover",
            }}
          />
          <div tw="flex flex-col ml-3">
            {username ? <div tw="text-xl">{username}</div> : null}
            <div
              tw="text-base"
              style={{
                color: "#646464",
              }}
            >
              {`@${handle}`}
            </div>
          </div>
        </div>
        <div tw="flex flex-col items-center">
          <img
            src={"https://app.sigle.io/icon-192x192.png"}
            alt="Sigle logo"
            height={30}
            width={30}
            style={{
              objectFit: "cover",
            }}
          />
          <div
            tw="text-base"
            style={{
              color: "#646464",
            }}
          >
            sigle.io
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
      // fonts: [
      //   {
      //     name: "Inter",
      //     data: interRegular,
      //     style: "normal",
      //     weight: 400,
      //   },
      //   {
      //     name: "Inter",
      //     data: interMedium,
      //     style: "normal",
      //     weight: 500,
      //   },
      // ],
    },
  );
}
