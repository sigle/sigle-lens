import {
  Profile,
  ProfileReportReason,
  useReportProfile,
} from "@lens-protocol/react-web";
import { Button, Dialog, Select, Text, TextArea } from "@radix-ui/themes";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePostHog } from "posthog-js/react";
import { toast } from "sonner";

const reportProfileSchema = z.object({
  reason: z.string(),
  additionalComments: z.string().optional(),
});

type ReportProfileFormData = z.infer<typeof reportProfileSchema>;

interface ReportProfileDialogProps {
  profile: Profile;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ReportProfileDialog = ({
  profile,
  open,
  onOpenChange,
}: ReportProfileDialogProps) => {
  const posthog = usePostHog();
  const { execute: reportProfile, loading: reportProfileLoading } =
    useReportProfile();

  const { register, handleSubmit, setValue, watch } =
    useForm<ReportProfileFormData>({
      resolver: zodResolver(reportProfileSchema),
    });
  const watchReason = watch("reason");

  const onSubmit = handleSubmit(async (formValues) => {
    const reportProfileResult = await reportProfile({
      profileId: profile.id,
      reason: formValues.reason as ProfileReportReason,
      additionalComments: formValues.additionalComments,
    });
    if (reportProfileResult.isFailure()) {
      toast.error("Failed to report profile. Please try again later.");
      return;
    }
    toast.message("Profile reported", {
      description: "Thank you for your feedback!",
    });
    posthog.capture("profile_reported", {
      profileId: profile.id,
      reason: formValues.reason,
      additionalComments: formValues.additionalComments,
    });
    onOpenChange(false);
  });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content size="3" className="max-w-[450px]">
        <Dialog.Title align="center">Report profile</Dialog.Title>
        <Dialog.Description size="2" align="center">
          Why are you reporting this profile?
        </Dialog.Description>

        <form onSubmit={onSubmit}>
          <div className="mt-4">
            <div className="space-y-4">
              <div className="space-y-1">
                <Text as="div" size="2" color="gray">
                  Reason
                </Text>
                <Select.Root
                  disabled={reportProfileLoading}
                  value={watchReason}
                  onValueChange={(value) => setValue("reason", value)}
                >
                  <Select.Trigger className="w-full" />
                  <Select.Content>
                    <Select.Group>
                      <Select.Label>Fraud</Select.Label>
                      <Select.Item value={ProfileReportReason.IMPERSONATION}>
                        Impersonation
                      </Select.Item>
                      <Select.Item
                        value={ProfileReportReason.FRAUD_SOMETHING_ELSE}
                      >
                        Something else
                      </Select.Item>
                    </Select.Group>
                    <Select.Separator />
                    <Select.Group>
                      <Select.Label>Spam</Select.Label>
                      <Select.Item value={ProfileReportReason.REPETITIVE}>
                        Scam
                      </Select.Item>
                      <Select.Item
                        value={ProfileReportReason.SPAM_SOMETHING_ELSE}
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
                disabled={reportProfileLoading}
              >
                Cancel
              </Button>
            </Dialog.Close>
            <Button type="submit" loading={reportProfileLoading}>
              Report
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
