import "highlight.js/styles/night-owl.css";
import { usePostsServicePostApiPostsByPostIdUploadMedia } from "@/__generated__/opanapi/queries";
import { useWindowSize } from "@/hooks/use-window-size";
import TipTapBlockquote from "@tiptap/extension-blockquote";
import TipTapBold from "@tiptap/extension-bold";
import TipTapBulletList from "@tiptap/extension-bullet-list";
import CharacterCount from "@tiptap/extension-character-count";
import TipTapCode from "@tiptap/extension-code";
import TipTapCodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import TipTapDocument from "@tiptap/extension-document";
import TipTapDropcursor from "@tiptap/extension-dropcursor";
import TipTapHardBreak from "@tiptap/extension-hard-break";
import TipTapHeading from "@tiptap/extension-heading";
import TipTapHistory from "@tiptap/extension-history";
import TipTapHorizontalRule from "@tiptap/extension-horizontal-rule";
import TipTapItalic from "@tiptap/extension-italic";
import TipTapLink from "@tiptap/extension-link";
import TipTapListItem from "@tiptap/extension-list-item";
import TipTapOrderedList from "@tiptap/extension-ordered-list";
import TipTapParagraph from "@tiptap/extension-paragraph";
import TipTapStrike from "@tiptap/extension-strike";
import TipTapText from "@tiptap/extension-text";
import TipTapTypography from "@tiptap/extension-typography";
import TipTapUnderline from "@tiptap/extension-underline";
import {
  EditorContent,
  type Extensions,
  ReactNodeViewRenderer,
  useEditor,
} from "@tiptap/react";
import { common, createLowlight } from "lowlight";
import { useParams } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { useFormContext } from "react-hook-form";
import { Markdown } from "tiptap-markdown";
import { EditorBottomInfo } from "./BottomInfo";
import { EditorBubbleMenu } from "./BubbleMenu";
import type { EditorPostFormData } from "./EditorFormProvider";
import styles from "./editor-tiptap.module.css";
import { CodeBlockComponent } from "./extensions/code-block";
import { TipTapImage } from "./extensions/image";
import { TipTapMobileScroll } from "./extensions/mobile-scroll";
import { TipTapPlaceholder } from "./extensions/placeholder";
import { slashCommands } from "./extensions/slash-command/commands";
import { SlashCommands } from "./extensions/slash-command/slash-commands";
import { TipTapEmbed } from "./extensions/twitter";
import { EditorFloatingMenu } from "./floating-menu";
import { useEditorStore } from "./store";

const lowlight = createLowlight(common);

export const EditorTipTap = () => {
  const params = useParams();
  const postId = params.postId as string;
  const posthog = usePostHog();
  const { width } = useWindowSize();
  const isMobile = width ? width < 768 : false;
  const { setValue, getValues } = useFormContext<EditorPostFormData>();
  const setEditor = useEditorStore((state) => state.setEditor);
  const { mutateAsync: uploadMedia, isPending: loadingUploadImage } =
    usePostsServicePostApiPostsByPostIdUploadMedia();

  const editor = useEditor({
    extensions: [
      CharacterCount,
      // Nodes
      TipTapDocument,
      TipTapParagraph,
      TipTapText,
      TipTapBlockquote.extend({ content: "paragraph+" }),
      TipTapLink.configure({
        openOnClick: false,
        // We disable the link on paste because we have other plugins listening to links like twitter or youtube...
        linkOnPaste: false,
      }),
      TipTapListItem,
      TipTapBulletList,
      TipTapOrderedList,
      TipTapHardBreak,
      TipTapHeading.configure({
        // Only allow h2 and h3
        levels: [2, 3],
      }),
      TipTapHorizontalRule,
      TipTapCodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent);
        },
      }).configure({
        lowlight,
      }),
      TipTapImage.configure({
        uploadFile: async (file: File) => {
          posthog.capture("editor_image_upload_start", {
            postId,
          });

          const formData = new FormData();
          formData.append("file", file);
          const data = await uploadMedia({
            postId,
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            requestBody: formData as any,
          });

          posthog.capture("editor_image_upload_success", {
            postId,
          });
          return data.url;
        },
      }),
      // Marks
      TipTapBold,
      TipTapCode,
      TipTapItalic,
      TipTapStrike,
      TipTapUnderline,
      // Extensions
      Markdown,
      TipTapDropcursor.configure({
        class: "bg-gray-11",
        width: 2,
      }),
      TipTapHistory,
      TipTapPlaceholder(isMobile),
      TipTapTypography,
      // Custom extensions
      TipTapEmbed,
      !isMobile
        ? SlashCommands.configure({
            commands: slashCommands,
          })
        : undefined,
      isMobile ? TipTapMobileScroll : undefined,
    ] as Extensions,
    content: getValues().content,
    // Expose the editor to the parent so we can use it to get the content
    onCreate: ({ editor }) => {
      setEditor(editor);
    },
    onUpdate: ({ editor }) => {
      const contentMarkdown = editor.storage.markdown.getMarkdown();
      setValue("content", contentMarkdown);
    },
  });

  return (
    <div className="prose dark:prose-invert lg:prose-lg">
      <EditorContent className={styles.editor} editor={editor} />

      {editor && !isMobile && <EditorBubbleMenu editor={editor} />}
      {editor && !isMobile && <EditorFloatingMenu editor={editor} />}
      {editor && !isMobile && <EditorBottomInfo editor={editor} />}
      {/* TODO mobile toolbar */}
    </div>
  );
};
