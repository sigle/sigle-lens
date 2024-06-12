import { Flex, Switch, Text, TextField } from "@radix-ui/themes";
import { IconPercentage } from "@tabler/icons-react";
import { useFormContext, useFormState } from "react-hook-form";
import type { EditorPostFormData } from "../../EditorFormProvider";

export const CollectReferral = () => {
  const { setValue, watch, register } = useFormContext<EditorPostFormData>();
  const watchReferralFeeEnabled = watch("collect.referralFee.enabled");
  const { errors } = useFormState<EditorPostFormData>({
    name: "collect.referralFee",
  });

  const onCheckedChange = (checked: boolean) => {
    setValue("collect.referralFee.enabled", checked, { shouldValidate: true });
    if (checked) {
      setValue("collect.referralFee.reward", 15, { shouldValidate: true });
    }
  };

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const rewardErrorMessage = (errors?.collect?.referralFee as any)?.reward
    ?.message;

  return (
    <div className="space-y-3">
      <Text as="p" size="3" weight="medium">
        Mirror referral reward
      </Text>
      <Flex gap="2" align="center" justify="between" className="min-h-[32px]">
        <label className="flex items-center">
          <Switch
            mr="2"
            size="1"
            checked={!!watchReferralFeeEnabled}
            onCheckedChange={onCheckedChange}
          />
          Share revenue with people who mirror your content on Lens
        </label>
        {watchReferralFeeEnabled && (
          <TextField.Root
            className="w-[100px] animate-in fade-in"
            type="number"
            max="100"
            min="1"
            {...register("collect.referralFee.reward")}
          >
            <TextField.Slot>
              <IconPercentage height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        )}
      </Flex>
      {rewardErrorMessage && (
        <Text size="2" color="red">
          {rewardErrorMessage}
        </Text>
      )}
    </div>
  );
};
