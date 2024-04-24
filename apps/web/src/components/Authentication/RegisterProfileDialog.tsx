import { Button, Dialog, Text, TextField } from "@radix-ui/themes";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import { useAccount } from "wagmi";
import { useLensClient } from "@/hooks/use-lens-client";
import { useAuthenticationStore } from "./store";

const registerProfileSchema = z.object({
  username: z.string().min(5).max(26),
});

type RegisterProfileFormData = z.infer<typeof registerProfileSchema>;

export const RegisterProfileDialog = () => {
  const { address } = useAccount();
  const registerProfileOpen = useAuthenticationStore(
    (state) => state.registerProfileOpen
  );
  const setRegisterProfileOpen = useAuthenticationStore(
    (state) => state.setRegisterProfileOpen
  );
  const lensClient = useLensClient();

  const {
    register,
    handleSubmit,
    formState: { isLoading, errors },
  } = useForm<RegisterProfileFormData>({
    resolver: zodResolver(registerProfileSchema),
  });

  const onSubmit = handleSubmit(async (formValues) => {
    if (!address) return;

    const result = await lensClient.wallet.createProfileWithHandle({
      handle: formValues.username,
      to: address,
    });
    console.log(result);

    // TODO proper error handling and loading https://docs.lens.xyz/docs/onboarding#testnet-profiles
  });

  return (
    <Dialog.Root
      open={registerProfileOpen}
      onOpenChange={setRegisterProfileOpen}
    >
      <Dialog.Content size="3" className="max-w-[450px]">
        <Text as="div" size="2" mb="4">
          Testnet only feature to create a Lens profile.
        </Text>
        <form onSubmit={onSubmit}>
          <TextField.Root
            size="2"
            placeholder="Mint your handle"
            autoComplete="off"
            {...register("username")}
          >
            <TextField.Slot>
              <IconSearch size={16} />
            </TextField.Slot>
          </TextField.Root>
          {errors.username && (
            <Text as="div" size="1" color="red" mt="1">
              {errors.username.message}
            </Text>
          )}

          <div className="mt-4 flex justify-end gap-3">
            <Button type="submit" loading={isLoading}>
              Mint <IconArrowRight size={16} />
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
