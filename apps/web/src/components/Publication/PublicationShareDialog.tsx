import { env } from "@/env";
import { Routes } from "@/lib/routes";
import { type Post, SessionType, useSession } from "@lens-protocol/react-web";
import {
  Button,
  Callout,
  Dialog,
  IconButton,
  Link,
  TextField,
} from "@radix-ui/themes";
import { IconReceiptTax } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

interface PublicationShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  publication: Post;
}

export const PublicationShareDialog = ({
  open,
  onOpenChange,
  publication,
}: PublicationShareDialogProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const { data: session } = useSession();
  const publicationLink = `${env.NEXT_PUBLIC_APP_URL}${Routes.publication(
    { id: publication.id },
    {
      search: {
        referral:
          session?.type === SessionType.WithProfile
            ? session.profile.id
            : undefined,
      },
    },
  )}`;

  const onCopy = () => {
    navigator.clipboard.writeText(publicationLink).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  const metadata =
    publication?.metadata.__typename === "ArticleMetadataV3"
      ? publication.metadata
      : null;
  const metaTitleAttribute =
    metadata?.attributes?.find((attribute) => attribute.key === "meta-title")
      ?.value ||
    metadata?.title ||
    "";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content size="3" className="max-w-sm">
        <Dialog.Title>Share</Dialog.Title>

        <div className="space-y-8">
          <Callout.Root variant="surface" size="1" color="gray">
            <Callout.Icon>
              <IconReceiptTax size={16} />
            </Callout.Icon>
            <Callout.Text>
              Earn curator rewards for each primary sale made through your link.{" "}
              <Link href="https://docs.sigle.io/TODO" target="_blank">
                Learn more.
              </Link>
            </Callout.Text>
          </Callout.Root>

          <div className="flex justify-center gap-5">
            <IconButton size="4" asChild>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  metaTitleAttribute,
                )} on @sigleapp&url=${publicationLink}`}
                target="_blank"
                rel="noreferrer noopener"
                className="overflow-hidden"
              >
                <Image
                  src="/images/x-logo.png"
                  alt="x logo"
                  width={48}
                  height={48}
                />
              </a>
            </IconButton>
            <IconButton size="4" asChild>
              <a
                href={`https://hey.xyz?text=${encodeURIComponent(
                  metaTitleAttribute,
                )} on @sigle&url=${publicationLink}`}
                target="_blank"
                rel="noreferrer noopener"
                className="overflow-hidden"
              >
                <Image
                  src="/images/hey-logo.png"
                  alt="hey logo"
                  width={48}
                  height={48}
                />
              </a>
            </IconButton>
            <IconButton size="4" asChild>
              <a
                href={`https://warpcast.com/~/compose?text=${encodeURIComponent(
                  metaTitleAttribute,
                )} on @sigleapp ${publicationLink}`}
                target="_blank"
                rel="noreferrer noopener"
                className="overflow-hidden"
              >
                <Image
                  src="/images/warpcast-logo.png"
                  alt="warpcast logo"
                  width={48}
                  height={48}
                />
              </a>
            </IconButton>
          </div>

          <div className="flex gap-2">
            <TextField.Root
              className="grow"
              variant="soft"
              disabled={true}
              defaultValue={publicationLink}
            />
            <Button
              color="gray"
              highContrast
              disabled={isCopied}
              onClick={onCopy}
            >
              {isCopied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};
