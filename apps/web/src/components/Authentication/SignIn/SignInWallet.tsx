import { Button, Callout, Dialog, Link } from "@radix-ui/themes";
import { IconInfoCircle, IconWallet } from "@tabler/icons-react";
import { useDisconnect } from "wagmi";

interface SignInWithWallet {
  connecting: boolean;
  onConnectWallet: () => void;
}

export const SignInWithWallet = ({
  connecting,
  onConnectWallet,
}: SignInWithWallet) => {
  const { disconnect } = useDisconnect();

  return (
    <>
      <Dialog.Title align="center">Connect your Wallet</Dialog.Title>
      <Dialog.Description size="2" align="center">
        Sign the message to verify you own the address.
      </Dialog.Description>

      <Callout.Root className="mt-4" color="gray" variant="surface">
        <Callout.Icon>
          <IconInfoCircle />
        </Callout.Icon>
        <Callout.Text>
          We couldn{"'"}t find a Lens profile attached to this address. To
          unlock all features, connect a Lens profile. In the meantime, you can
          collect posts with this address.
        </Callout.Text>
      </Callout.Root>

      <Button
        className="mt-4 w-full"
        size="3"
        color="gray"
        highContrast
        loading={connecting}
        onClick={() => onConnectWallet()}
      >
        Sign message
      </Button>
      <Link
        className="mt-1 flex items-center gap-1"
        size="1"
        color="gray"
        onClick={() => disconnect()}
      >
        <IconWallet size={14} />
        Change wallet
      </Link>
    </>
  );
};
