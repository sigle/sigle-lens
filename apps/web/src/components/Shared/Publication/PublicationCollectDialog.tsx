import { useSignInWallet } from "@/hooks/use-sign-in-wallet";
import { getOpenActionModule } from "@/lib/collect";
import { formatUSDollar, useCurrencyFiatPrice } from "@/lib/currencies";
import { getPolygonscanAddressLink } from "@/lib/links";
import {
  getBoringAvatarUrl,
  getProfileAvatarUrl,
  getProfileHandle,
} from "@/lib/profile";
import {
  OpenActionKind,
  type Post,
  publicationId,
  useOpenAction,
  useSession,
} from "@lens-protocol/react-web";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Dialog,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import { IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";

interface PublicationCollectDialogProps {
  publication: Post;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PublicationCollectDialog = ({
  publication,
  open,
  onOpenChange,
}: PublicationCollectDialogProps) => {
  const urlParams = new URLSearchParams(window.location.search);
  const referral = urlParams.get("referral");
  const openActionModule = getOpenActionModule(publication);

  const { signInWithWallet } = useSignInWallet();
  const { data: session } = useSession();
  const { execute: collect, loading: loadingCollect } = useOpenAction({
    action: {
      kind: OpenActionKind.COLLECT,
      referrers: referral ? [publicationId(referral)] : undefined,
    },
  });
  const { data: currencyFiatPrice } = useCurrencyFiatPrice(
    // We wait for the dialog to be open to fetch the price
    open ? openActionModule?.amount.asset.symbol : undefined,
  );
  const [infoOpen, setInfoOpen] = useState(false);

  const onCollect = async () => {
    if (!session?.authenticated) {
      signInWithWallet();
      return;
    }

    const result = await collect({
      publication,
    });
    if (result.isFailure()) {
      toast("Failed to collect", {
        description: result.error.message,
      });
      return;
    }
    toast.info("Collect successful");
    onOpenChange(false);
  };

  const metadata =
    publication?.metadata.__typename === "ArticleMetadataV3"
      ? publication.metadata
      : null;
  const metaTitleAttribute = metadata?.attributes?.find(
    (attribute) => attribute.key === "meta-title",
  );

  const referralFee = openActionModule?.referralFee
    ? openActionModule.referralFee
    : 0;

  const isFree = openActionModule?.amount.value === "0";

  // This should never happen
  if (!openActionModule) return;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content size="3" className="max-w-sm">
        <Dialog.Title>Collect </Dialog.Title>

        <div className="space-y-5">
          <Card>
            <Heading size="3" className="line-clamp-2">
              {metaTitleAttribute?.value || metadata?.title}
            </Heading>
            <Flex mt="2" justify="between" align="center">
              <Flex align="center" gap="1">
                <Avatar
                  src={getProfileAvatarUrl(publication.by)}
                  fallback={
                    publication.by.handle?.localName[0] || publication.by.id[0]
                  }
                  alt={getProfileHandle(publication.by)}
                  size="1"
                />
                {publication.by.metadata ? (
                  <Text size="1">{publication.by.metadata.displayName}</Text>
                ) : null}
                <Badge variant="soft" color="gray">
                  {getProfileHandle(publication.by)}
                </Badge>
              </Flex>
            </Flex>
          </Card>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Heading size="3">
                Collect{" "}
                {openActionModule.collectLimit
                  ? "Limited edition"
                  : "Open edition"}
              </Heading>
              <Button
                size="1"
                color="gray"
                variant="ghost"
                onClick={() => setInfoOpen(!infoOpen)}
              >
                Info <IconChevronDown size={12} />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <Text as="div" size="2" weight="medium">
                {isFree
                  ? "Free"
                  : `${openActionModule.amount.value} ${openActionModule.amount.asset.symbol}`}{" "}
                {currencyFiatPrice ? (
                  <Text size="1" color="gray">
                    ~
                    {formatUSDollar.format(
                      Number(openActionModule.amount.value) *
                        Number(currencyFiatPrice),
                    )}
                  </Text>
                ) : null}
              </Text>
              {referralFee ? (
                <Badge color="gray">{referralFee}% referral</Badge>
              ) : null}
            </div>

            {openActionModule.collectLimit ? (
              <div className="flex items-center justify-between">
                <Text as="div" size="2" color="gray">
                  {publication.stats.collects}/{openActionModule.collectLimit}{" "}
                  mints
                </Text>
                <Badge color="gray">
                  {Number(openActionModule.collectLimit) -
                    publication.stats.collects}{" "}
                  left
                </Badge>
              </div>
            ) : (
              <Text as="div" size="2" color="gray">
                {publication.stats.collects} minted
              </Text>
            )}
          </div>

          {infoOpen ? (
            <>
              {openActionModule?.__typename ===
              "MultirecipientFeeCollectOpenActionSettings" ? (
                <div className="space-y-1">
                  <Text as="p" weight="medium" size="2">
                    Fee recipients
                  </Text>
                  <div className="space-y-2">
                    {openActionModule.recipients.map((recipient) => (
                      <Flex
                        key={recipient.recipient}
                        justify="between"
                        align="center"
                        gap="2"
                      >
                        <Avatar
                          src={getBoringAvatarUrl(recipient.recipient)}
                          fallback={recipient.recipient[0]}
                          alt={recipient.recipient}
                          size="1"
                        />
                        <Text as="p" size="2" className="truncate">
                          {recipient.recipient}
                        </Text>
                        <Text as="p" size="2">
                          {recipient.split}%
                        </Text>
                      </Flex>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="space-y-1">
                <Text as="p" weight="medium" size="2">
                  Contract address
                </Text>
                <Text as="p" size="2" className="truncate">
                  <a
                    href={getPolygonscanAddressLink(
                      openActionModule.contract.address,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {openActionModule.contract.address}
                  </a>
                </Text>
              </div>
            </>
          ) : null}

          <div className="space-y-2">
            <Button
              className="w-full"
              size="3"
              loading={loadingCollect}
              onClick={onCollect}
            >
              {isFree
                ? "Collect"
                : `Collect with ${openActionModule.amount.asset.symbol}`}
            </Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};
