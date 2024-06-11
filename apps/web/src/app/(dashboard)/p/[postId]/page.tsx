import { lensClient } from "@/lib/lens";
import { serializeLensPost } from "@/lib/publication";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostClient } from "./PageClient";

type Props = {
  params: { postId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const publication = await lensClient.publication.fetch({
    forId: params.postId,
  });

  if (
    !publication ||
    publication.__typename !== "Post" ||
    publication.metadata.__typename !== "ArticleMetadataV3"
  ) {
    notFound();
  }

  const post = serializeLensPost(publication);
  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;

  return {
    title: `${title} | Sigle`,
    description,
  };
}

export default function Post({ params }: Props) {
  return <PostClient params={params} />;
}
