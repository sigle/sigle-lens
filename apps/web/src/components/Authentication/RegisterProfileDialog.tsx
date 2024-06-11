import { LogoImage } from "@/images/Logo";
import { Button, Dialog, Heading, Text } from "@radix-ui/themes";
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import { useAuthenticationStore } from "./store";

export const RegisterProfileDialog = () => {
  const registerProfileOpen = useAuthenticationStore(
    (state) => state.registerProfileOpen,
  );
  const setRegisterProfileOpen = useAuthenticationStore(
    (state) => state.setRegisterProfileOpen,
  );

  const onMintProfile = () => {
    setRegisterProfileOpen(false);
  };

  return (
    <Dialog.Root
      open={registerProfileOpen}
      onOpenChange={setRegisterProfileOpen}
    >
      <Dialog.Content size="3" className="max-w-[450px]">
        <LogoImage height={28} />

        <Heading as="h2" size="4" className="mt-5">
          Create a Lens profile
        </Heading>

        <Text className="mt-4" as="p" size="2" color="gray">
          You need a Lens profile to use all the features of Sigle. With it you
          can create content, start a following, and more.
        </Text>

        <Text className="mt-2" as="p" size="2" color="gray">
          Mint your profile to get started!
        </Text>

        <Button
          className="mt-4 w-full"
          size="3"
          color="gray"
          highContrast
          asChild
        >
          <Link href="/mint" onClick={onMintProfile}>
            Mint your profile <IconArrowRight size={16} />
          </Link>
        </Button>
      </Dialog.Content>
    </Dialog.Root>
  );
};
