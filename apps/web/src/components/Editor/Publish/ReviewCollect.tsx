import { useCurrencies } from "@lens-protocol/react-web";
import { Badge, Card, IconButton, Inset, Text } from "@radix-ui/themes";
import { IconCards, IconPencil } from "@tabler/icons-react";
import { useFormContext } from "react-hook-form";
import type { EditorPostFormData } from "../EditorFormProvider";
import { useEditorStore } from "../store";

export const PublishReviewCollect = () => {
  const { data: currencies } = useCurrencies();
  const { getValues } = useFormContext<EditorPostFormData>();
  const setMenuOpen = useEditorStore((state) => state.setMenuOpen);
  const setPublishOpen = useEditorStore((state) => state.setPublishOpen);
  const data = getValues();

  const collectLimit =
    data.collect.collectLimit?.enabled === true &&
    data.collect.collectLimit.limit
      ? data.collect.collectLimit.limit
      : undefined;
  const price =
    !data.collect.price || data.collect.price === 0
      ? "Free"
      : data.collect.price;
  const currencySymbol =
    price !== "Free"
      ? currencies?.find(
          (currency) => currency.address === data.collect.currency,
        )?.symbol
      : null;
  const referralFee = data.collect.referralFee?.enabled
    ? data.collect.referralFee?.reward
    : 0;
  const recipients = data.collect.recipients?.enabled
    ? data.collect.recipients?.recipients
    : null;

  const openCollectSettings = () => {
    setPublishOpen(false);
    setMenuOpen("collect");
  };

  return (
    <Card size="2">
      <Inset clip="padding-box" side="top" pb="current">
        <div className="flex items-center justify-between border-b border-solid border-gray-4 bg-gray-2 p-4">
          <Text
            as="div"
            size="2"
            weight="medium"
            className="flex items-center gap-2"
          >
            <IconCards size={20} />
            Collect settings
          </Text>
          <IconButton
            variant="ghost"
            color="gray"
            onClick={openCollectSettings}
          >
            <IconPencil size={16} />
          </IconButton>
        </div>
      </Inset>
      <div className="-my-3">
        <div className="flex justify-between py-3">
          <Text size="2" color="gray">
            Type
          </Text>
          <Text size="2">
            {collectLimit ? (
              <>
                Limited edition{" "}
                <Badge color="gray" highContrast>
                  {collectLimit}
                </Badge>
              </>
            ) : (
              "Open edition"
            )}
          </Text>
        </div>
        <div className="flex justify-between border-t border-solid border-gray-4 py-3">
          <Text size="2" color="gray">
            Price
          </Text>
          <Text size="2">
            {price} {currencySymbol}
          </Text>
        </div>
        <div className="flex justify-between border-t border-solid border-gray-4 py-3">
          <Text size="2" color="gray">
            Referral reward
          </Text>
          <Text size="2">{referralFee}%</Text>
        </div>
        <div className="flex justify-between border-t border-solid border-gray-4 py-3">
          <Text size="2" color="gray">
            Split revenue
          </Text>
          <Text size="2">{recipients ? recipients.length : 1} recipients</Text>
        </div>
      </div>
    </Card>
  );
};
