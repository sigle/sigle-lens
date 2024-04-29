import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { isAddress } from "viem";
import { PostsServiceGetApiPostsByPostIdDefaultResponse } from "@/__generated__/opanapi/queries";

const editorPostSchema = z.object({
  type: z.enum(["draft", "published"] as const),
  title: z.string().min(4),
  content: z.string().min(4),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  coverImage: z.string().optional(),
  collect: z.object({
    price: z.coerce.number().min(0).optional(),
    currency: z.string().optional(),
    collectLimit: z
      .discriminatedUnion("enabled", [
        z.object({
          enabled: z.literal(true),
          limit: z.coerce.number().int().min(1),
        }),
        z.object({
          enabled: z.literal(false),
        }),
      ])
      .optional(),
    referralFee: z
      .discriminatedUnion("enabled", [
        z.object({
          enabled: z.literal(true),
          reward: z.coerce.number().int().min(0).max(100),
        }),
        z.object({
          enabled: z.literal(false),
        }),
      ])
      .optional(),
    recipients: z
      .discriminatedUnion("enabled", [
        z.object({
          enabled: z.literal(true),
          recipients: z
            .array(
              z.object({
                recipient: z
                  .string()
                  .trim()
                  .refine((value) => isAddress(value), {
                    message: "Invalid Ethereum address",
                  }),
                split: z.coerce.number().int().min(0).max(100),
              })
            )
            .min(1)
            .max(5)
            // Sum of all the splits must be 100
            .refine((recipients) => {
              const sum = recipients.reduce((acc, recipient) => {
                return acc + recipient.split;
              }, 0);
              return sum === 100;
            }, "Sum of all the splits must be 100%")
            // No duplicate recipients
            .refine((recipients) => {
              const uniqueRecipients = new Set(
                recipients.map((recipient) => recipient.recipient)
              );
              return uniqueRecipients.size === recipients.length;
            }, "Duplicate recipients found"),
        }),
        z.object({
          enabled: z.literal(false),
        }),
      ])
      .optional(),
  }),
});

export type EditorPostFormData = z.infer<typeof editorPostSchema>;

interface EditorFormProviderProps {
  children: React.ReactNode;
  type: "draft" | "published";
  post: PostsServiceGetApiPostsByPostIdDefaultResponse;
}

export const EditorFormProvider = ({
  children,
  type,
  post,
}: EditorFormProviderProps) => {
  const methods = useForm<EditorPostFormData>({
    mode: "onBlur",
    resolver: zodResolver(editorPostSchema),
    defaultValues: {
      type,
      title: post.title,
      content: post.content || "",
      metaTitle: post.metaTitle || undefined,
      metaDescription: post.metaDescription || undefined,
      coverImage: post.coverImage || undefined,
      collect: {
        collectLimit: {
          enabled: false,
        },
        referralFee: {
          enabled: false,
        },
        recipients: {
          enabled: false,
        },
      },
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};
