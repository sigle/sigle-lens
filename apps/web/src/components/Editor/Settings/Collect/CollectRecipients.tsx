import { SessionType, useSession } from "@lens-protocol/react-web";
import { Button, IconButton, Switch, Text, TextField } from "@radix-ui/themes";
import { IconPercentage, IconX } from "@tabler/icons-react";
import { useFieldArray, useFormContext, useFormState } from "react-hook-form";
import type { EditorPostFormData } from "../../EditorFormProvider";

export const CollectRecipients = () => {
  const { data: session } = useSession();
  const { setValue, watch, register } = useFormContext<EditorPostFormData>();
  const watchMirrorRecipientsEnabled = watch("collect.recipients.enabled");
  const { fields, append, remove } = useFieldArray<EditorPostFormData>({
    name: "collect.recipients.recipients",
  });
  const { errors } = useFormState<EditorPostFormData>({
    name: ["collect.recipients.enabled", "collect.recipients.recipients"],
  });

  const onCheckedChange = (checked: boolean) => {
    setValue("collect.recipients.enabled", checked, { shouldValidate: true });
    if (checked && session?.type === SessionType.WithProfile) {
      setValue("collect.recipients.recipients", [
        { recipient: session.profile.ownedBy.address, split: 100 },
      ]);
    }
  };

  const onAddNewField = () => {
    if (fields.length >= 5) {
      return;
    }
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    append({ recipient: "" as any, split: 0 });
  };

  const onDeleteField = (index: number) => {
    // If it's the last field, we don't want to remove it
    if (fields.length === 1) {
      return;
    }
    remove(index);
  };

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const rootErrorMessage = (errors?.collect?.recipients as any)?.recipients
    ?.root?.message;

  return (
    <div className="space-y-3">
      <Text as="p" size="3" weight="medium">
        Split revenue
      </Text>
      <div className="space-y-3">
        <label className="flex items-center">
          <Switch
            mr="2"
            size="1"
            checked={!!watchMirrorRecipientsEnabled}
            onCheckedChange={onCheckedChange}
          />
          Set multiple recipients for the collected revenue
        </label>

        {watchMirrorRecipientsEnabled &&
          fields.map((field, index) => {
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            const recipientError = (errors?.collect?.recipients as any)
              ?.recipients?.[index]?.recipient?.message;
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            const splitError = (errors?.collect?.recipients as any)
              ?.recipients?.[index]?.split?.message;

            return (
              <div key={field.id} className="space-y-3 animate-in fade-in">
                <div className="flex gap-2">
                  <TextField.Root
                    className="w-full"
                    placeholder="Add Ethereum address"
                    {...register(
                      `collect.recipients.recipients.${index}.recipient`,
                    )}
                  />
                  <TextField.Root
                    className="w-[120px]"
                    type="number"
                    max="100"
                    min="1"
                    {...register(
                      `collect.recipients.recipients.${index}.split`,
                    )}
                  >
                    <TextField.Slot>
                      <IconPercentage height="16" width="16" />
                    </TextField.Slot>
                  </TextField.Root>
                  <IconButton
                    color="gray"
                    variant="soft"
                    onClick={() => onDeleteField(index)}
                  >
                    <IconX size={16} />
                  </IconButton>
                </div>
                {recipientError && (
                  <Text as="p" size="2" color="red">
                    {recipientError}
                  </Text>
                )}
                {splitError && (
                  <Text as="p" size="2" color="red">
                    {splitError}
                  </Text>
                )}
              </div>
            );
          })}

        {watchMirrorRecipientsEnabled && fields.length < 5 && (
          <Button variant="soft" onClick={onAddNewField}>
            Add new recipient
          </Button>
        )}
      </div>
      {rootErrorMessage && (
        <Text as="p" size="2" color="red">
          {rootErrorMessage}
        </Text>
      )}
    </div>
  );
};
