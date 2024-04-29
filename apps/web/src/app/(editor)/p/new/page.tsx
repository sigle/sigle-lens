"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { PageEditorSkeleton } from "../[postId]/loading";
import { usePostsServicePostApiPostsCreate } from "@/__generated__/opanapi/queries";

export default function PostCreate({}) {
  const router = useRouter();
  const { mutate: createPost } = usePostsServicePostApiPostsCreate({
    onSuccess: (data) => {
      router.push(`/p/${data.id}/edit`);
    },
    onError: (error: { message: string }) => {
      toast.error("Failed to upload metadata", {
        description: error.message,
      });
    },
  });

  useEffect(() => {
    createPost();
  }, []);

  return <PageEditorSkeleton />;
}
