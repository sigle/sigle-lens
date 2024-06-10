"use client";

import { usePostsServicePostApiPostsCreate } from "@/__generated__/opanapi/queries";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { PageEditorSkeleton } from "./loading";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <PageEditorSkeleton />;
}
