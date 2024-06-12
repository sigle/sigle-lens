import { Flex, Switch, Text, TextField } from "@radix-ui/themes";
import { useFormContext, useFormState } from "react-hook-form";
import type { EditorPostFormData } from "../../EditorFormProvider";

export const CollectEdition = () => {
  const { setValue, watch, register } = useFormContext<EditorPostFormData>();
  const watchCollectLimitEnabled = watch("collect.collectLimit.enabled");
  const { errors } = useFormState<EditorPostFormData>({
    name: ["collect.collectLimit.enabled", "collect.collectLimit.limit"],
  });

  const onCheckedChange = (checked: boolean) => {
    setValue("collect.collectLimit.enabled", checked, { shouldValidate: true });
    if (checked) {
      setValue("collect.collectLimit.limit", 100, { shouldValidate: true });
    }
  };

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const limitErrorMessage = (errors?.collect?.collectLimit as any)?.limit
    ?.message;

  return (
    <div className="space-y-3">
      <Text as="p" size="3" weight="medium">
        Limited edition
      </Text>
      <Flex gap="2" align="center" justify="between" className="min-h-[32px]">
        <label className="flex items-center">
          <Switch
            mr="2"
            size="1"
            checked={!!watchCollectLimitEnabled}
            onCheckedChange={onCheckedChange}
          />
          Create a limited edition
        </label>
        {watchCollectLimitEnabled && (
          <TextField.Root
            className="w-[120px] animate-in fade-in"
            type="number"
            min="1"
            {...register("collect.collectLimit.limit")}
          />
        )}
      </Flex>
      {limitErrorMessage && (
        <Text size="2" color="red">
          {limitErrorMessage}
        </Text>
      )}
    </div>
  );
};
