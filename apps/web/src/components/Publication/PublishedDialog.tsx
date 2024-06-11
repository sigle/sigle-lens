import { Button, Callout, Dialog } from "@radix-ui/themes";
import { useState } from "react";

interface PublishedDialogProps {
  onShare: () => void;
}

export const PublishedDialog = ({ onShare }: PublishedDialogProps) => {
  const urlParams = new URLSearchParams(window.location.search);
  const published = urlParams.get("published") === "true";
  if (published) {
    // Remove the query param from the URL so the user doesn't share it by mistake
    const url = new URL(window.location.href);
    url.searchParams.delete("published");
    history.replaceState({}, document.title, url.toString());
  }
  const [isOpen, setIsOpen] = useState(published);

  const handleShare = () => {
    setIsOpen(false);
    onShare();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content size="3" className="max-w-sm text-center">
        <Dialog.Title>Publication published!</Dialog.Title>

        <div className="flex flex-col items-center space-y-4">
          <Callout.Root variant="surface" size="2" color="gray">
            <Callout.Text className="text-center">
              Your publication has been published and stored on the blockchain.
              <br />
              You can now share it with the world!
            </Callout.Text>
          </Callout.Root>

          <Button color="gray" highContrast onClick={handleShare}>
            Share
          </Button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};
