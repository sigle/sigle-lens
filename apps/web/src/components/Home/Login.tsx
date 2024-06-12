import { useSignInWallet } from "@/hooks/use-sign-in-wallet";
import { Button, Container, Heading, Text } from "@radix-ui/themes";
import { FadeSlideBottom } from "../ui/animations/FadeSlideBottom";

export const HomeLogin = () => {
  const { signInWithWallet } = useSignInWallet();

  return (
    <FadeSlideBottom>
      <Container size="1" className="py-10">
        <Heading as="h1" size="4">
          Welcome to Sigle!
        </Heading>
        <Text as="p" className="mt-4">
          Sigle is a secured and open-source writing platform for web3 content
          creators, NFT projects, crypto analysts and more.
        </Text>
        <Text as="p" className="mt-2">
          Connect your wallet to get started.
        </Text>
        <Button
          className="mt-5"
          size="3"
          color="gray"
          highContrast
          onClick={signInWithWallet}
        >
          Connect wallet
        </Button>
      </Container>
    </FadeSlideBottom>
  );
};
