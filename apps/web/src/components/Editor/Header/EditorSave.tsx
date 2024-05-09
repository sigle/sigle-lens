import { Callout, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useParams } from "next/navigation";
import { IconInfoCircle } from "@tabler/icons-react";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import { useEditorStore } from "../store";
import { EditorPostFormData } from "../EditorFormProvider";
import { usePostsServicePostApiPostsByPostIdUpdate } from "@/__generated__/opanapi/queries";

export const EditorSave = () => {
  const params = useParams();
  const postId = params.postId as string;
  const [saveState, setSaveState] = useState<
    "idle" | "saving" | "error" | "saved"
  >("idle");
  const { watch, getValues } = useFormContext<EditorPostFormData>();
  const { mutate: updatePost } = usePostsServicePostApiPostsByPostIdUpdate();
  const editor = useEditorStore((state) => state.editor);

  // When the form is changing, we start a timer to save the post
  // We wait for the editor to be ready before listening to changes
  useEffect(() => {
    if (!editor) return;
    const subscription = watch(() => {
      setSaveState("saving");
      onAutoSave();
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, editor]);

  const onAutoSave = useDebouncedCallback(
    () => {
      if (!editor) return;
      updatePost(
        {
          postId,
          requestBody: {
            ...getValues(),
          },
        },
        {
          onSuccess: () => {
            setSaveState("saved");
          },
          onError: () => {
            setSaveState("error");
          },
        }
      );
    },
    2000,
    [editor]
  );

  if (saveState === "error") {
    return (
      <Callout.Root color="red" size="1">
        <Callout.Icon>
          <IconInfoCircle />
        </Callout.Icon>
        <Callout.Text>Error Saving, please try again</Callout.Text>
      </Callout.Root>
    );
  }

  return (
    <Text size="2">
      {saveState === "idle"
        ? ""
        : saveState === "saved"
          ? "Saved"
          : "Saving..."}
    </Text>
  );
};
