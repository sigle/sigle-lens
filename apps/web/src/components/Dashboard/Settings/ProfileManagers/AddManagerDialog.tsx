import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateProfileManagers } from "@lens-protocol/react-web";
import {
  Button,
  Dialog,
  Flex,
  Spinner,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { isAddress } from "viem";
import { toast } from "sonner";
import { usePostHog } from "posthog-js/react";

const addManagerSchema = z.object({
  address: z.string().refine((value) => isAddress(value), {
    message: "Invalid Ethereum address",
  }),
});

type AddManagerFormData = z.infer<typeof addManagerSchema>;

interface AddManagerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddManagerDialog = ({
  open,
  onOpenChange,
}: AddManagerDialogProps) => {
  const posthog = usePostHog();
  const {
    execute: updateProfileManager,
    loading: loadingUpdateProfileManager,
  } = useUpdateProfileManagers();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddManagerFormData>({
    resolver: zodResolver(addManagerSchema),
  });

  const onSubmit = handleSubmit(async (formValues) => {
    const resultUpdateProfile = await updateProfileManager({
      add: [formValues.address],
    });
    if (resultUpdateProfile.isFailure()) return;

    toast.message("Profile manager added successfully");
    posthog.capture("add_profile_manager", {
      address: formValues.address,
    });
    onOpenChange(false);
  });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content size="3">
        <Dialog.Title>Add a new profile manager</Dialog.Title>
        <Dialog.Description size="2" mb="4" color="gray">
          Adding a new profile manager will grant them control over your profile
          and can act on your behalf.
        </Dialog.Description>

        <form onSubmit={onSubmit}>
          <Flex direction="column" gap="4">
            <div>
              <Text as="div" size="2" mb="1">
                Manager address
              </Text>
              <TextField.Root
                placeholder="0x000..."
                disabled={loadingUpdateProfileManager}
                {...register("address")}
              />
              {errors.address && (
                <Text as="div" size="1" color="red" mt="1">
                  {errors.address.message}
                </Text>
              )}
            </div>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button
                variant="soft"
                color="gray"
                disabled={loadingUpdateProfileManager}
              >
                Cancel
              </Button>
            </Dialog.Close>
            <Button loading={loadingUpdateProfileManager} type="submit">
              Submit
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
