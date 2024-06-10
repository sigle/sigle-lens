import { type Post, useHidePublication } from "@lens-protocol/react-web";
import { Button, Callout, Dialog } from "@radix-ui/themes";
import { IconInfoCircle } from "@tabler/icons-react";
import { usePostHog } from "posthog-js/react";
import { toast } from "sonner";

interface PublicationHideDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  publication: Post;
}

export const PublicationHideDialog = ({
  open,
  onOpenChange,
  publication,
}: PublicationHideDialogProps) => {
  const posthog = usePostHog();
  const { execute: hidePublication, loading: loadingHidePublication } =
    useHidePublication();

  const onHidePublication = async () => {
    const hidePublicationResult = await hidePublication({
      publication,
    });
    if (hidePublicationResult.isFailure()) {
      toast.error(hidePublicationResult.error);
      return;
    }
    toast.info("Publication hidden", {
      description: "This publication has been hidden from your profile.",
    });
    posthog.capture("publication_hidden", {
      postId: publication.id,
    });
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content size="3" className="max-w-sm">
        <Dialog.Title>Hide publication</Dialog.Title>

        <div className="space-y-4">
          <Callout.Root variant="surface" size="1" color="gray">
            <Callout.Icon>
              <IconInfoCircle size={16} />
            </Callout.Icon>
            <Callout.Text>
              This publication will be hidden from your profile. This will
              prevent other profiles from seeing it on Sigle but it will still
              be available on the blockchain.
            </Callout.Text>
          </Callout.Root>

          <div className="flex justify-end gap-3">
            <Dialog.Close>
              <Button
                variant="soft"
                color="gray"
                disabled={loadingHidePublication}
              >
                Cancel
              </Button>
            </Dialog.Close>
            <Button
              color="gray"
              highContrast
              onClick={onHidePublication}
              loading={loadingHidePublication}
            >
              Hide
            </Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};
