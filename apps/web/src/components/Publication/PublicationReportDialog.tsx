import { zodResolver } from "@hookform/resolvers/zod";
import {
  type Post,
  PublicationReportReason,
  useReportPublication,
} from "@lens-protocol/react-web";
import { Button, Dialog, Select, Text, TextArea } from "@radix-ui/themes";
import { usePostHog } from "posthog-js/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const publicationReportSchema = z.object({
  reason: z.string(),
  additionalComments: z.string().optional(),
});

type PublicationReportFormData = z.infer<typeof publicationReportSchema>;

interface PublicationReportDialogProps {
  publication: Post;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PublicationReportDialog = ({
  publication,
  open,
  onOpenChange,
}: PublicationReportDialogProps) => {
  const posthog = usePostHog();
  const { execute: reportPublication, loading: reportPublicationLoading } =
    useReportPublication();

  const { register, handleSubmit, setValue, watch } =
    useForm<PublicationReportFormData>({
      resolver: zodResolver(publicationReportSchema),
    });
  const watchReason = watch("reason");

  const onSubmit = handleSubmit(async (formValues) => {
    const reportPublicationResult = await reportPublication({
      publicationId: publication.id,
      reason: formValues.reason as PublicationReportReason,
      additionalComments: formValues.additionalComments,
    });
    if (reportPublicationResult.isFailure()) {
      toast.error("Failed to report publication");
      return;
    }
    toast.info("Publication reported");
    posthog.capture("publication_reported", {
      publicationId: publication.id,
      reason: formValues.reason,
      additionalComments: formValues.additionalComments,
    });
    onOpenChange(false);
  });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content size="3" className="max-w-[450px]">
        <Dialog.Title align="center">Report publication</Dialog.Title>
        <Dialog.Description size="2" align="center">
          Why are you reporting this publication?
        </Dialog.Description>

        <form onSubmit={onSubmit}>
          <div className="mt-4">
            <div className="space-y-4">
              <div className="space-y-1">
                <Text as="div" size="2" color="gray">
                  Reason
                </Text>
                <Select.Root
                  disabled={reportPublicationLoading}
                  value={watchReason}
                  onValueChange={(value) => setValue("reason", value)}
                >
                  <Select.Trigger className="w-full" />
                  <Select.Content>
                    <Select.Group>
                      <Select.Label>Illegal</Select.Label>
                      <Select.Item value={PublicationReportReason.HARASSMENT}>
                        Bullying or harassment
                      </Select.Item>
                      <Select.Item value={PublicationReportReason.VIOLENCE}>
                        Violence
                      </Select.Item>
                      <Select.Item value={PublicationReportReason.SELF_HARM}>
                        Self-harm or suicide
                      </Select.Item>
                      <Select.Item value={PublicationReportReason.HATE_SPEECH}>
                        Hate speech or symbols
                      </Select.Item>
                      <Select.Item
                        value={PublicationReportReason.DIRECT_THREAT}
                      >
                        Direct threat
                      </Select.Item>
                      <Select.Item value={PublicationReportReason.ANIMAL_ABUSE}>
                        Animal abuse
                      </Select.Item>
                    </Select.Group>
                    <Select.Separator />
                    <Select.Group>
                      <Select.Label>Fraud</Select.Label>
                      <Select.Item value={PublicationReportReason.SCAM}>
                        Scam
                      </Select.Item>
                      <Select.Item
                        value={PublicationReportReason.UNAUTHORIZED_SALE}
                      >
                        Sale of unauthorized or illegal goods
                      </Select.Item>
                      <Select.Item
                        value={PublicationReportReason.IMPERSONATION}
                      >
                        Impersonation
                      </Select.Item>
                    </Select.Group>
                    <Select.Separator />
                    <Select.Group>
                      <Select.Label>Sensitive content</Select.Label>
                      <Select.Item value={PublicationReportReason.NUDITY}>
                        Nudity or sexual activity
                      </Select.Item>
                      <Select.Item value={PublicationReportReason.OFFENSIVE}>
                        Offensive
                      </Select.Item>
                    </Select.Group>
                    <Select.Separator />
                    <Select.Group>
                      <Select.Label>Spam</Select.Label>
                      <Select.Item value={PublicationReportReason.MISLEADING}>
                        Misleading
                      </Select.Item>
                      <Select.Item
                        value={PublicationReportReason.MISUSE_HASHTAGS}
                      >
                        Misuse of hashtags
                      </Select.Item>
                      <Select.Item value={PublicationReportReason.UNRELATED}>
                        Unrelated
                      </Select.Item>
                      <Select.Item value={PublicationReportReason.REPETITIVE}>
                        Repetitive
                      </Select.Item>
                      <Select.Item
                        value={PublicationReportReason.FAKE_ENGAGEMENT}
                      >
                        Fake engagement
                      </Select.Item>
                      <Select.Item
                        value={PublicationReportReason.MANIPULATION_ALGO}
                      >
                        Algorithm manipulation
                      </Select.Item>
                      <Select.Item
                        value={PublicationReportReason.SOMETHING_ELSE}
                      >
                        Something else
                      </Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
              </div>

              <div className="space-y-1">
                <Text as="div" size="2" color="gray">
                  Additional comments
                </Text>
                <TextArea
                  placeholder="Optional comment"
                  maxLength={250}
                  rows={3}
                  color="gray"
                  {...register("additionalComments")}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <Dialog.Close>
              <Button
                variant="soft"
                color="gray"
                disabled={reportPublicationLoading}
              >
                Cancel
              </Button>
            </Dialog.Close>
            <Button type="submit" loading={reportPublicationLoading}>
              Report
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
