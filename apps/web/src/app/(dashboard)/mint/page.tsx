"use client";

import { MintProfileChooseHandleForm } from "@/components/MintProfile/ChooseHandleForm";
import { FadeSlideBottom } from "@/components/ui/animations/FadeSlideBottom";
import { env } from "@/env";
import { useSignInWallet } from "@/hooks/use-sign-in-wallet";
import { PolygonLogo } from "@/images/PolygonLogo";
import { useCreateProfile } from "@lens-protocol/react-web";
import {
  Button,
  Callout,
  Card,
  Container,
  Heading,
  Link,
  Text,
} from "@radix-ui/themes";
import { IconArrowRight, IconCheck, IconInfoCircle } from "@tabler/icons-react";
import { useState } from "react";
import { useAccount } from "wagmi";

const price = 8;

export default function MintPage() {
  const { address } = useAccount();
  const { signInWithWallet } = useSignInWallet();
  const {
    execute: createProfile,
    loading: isCreating,
    error,
  } = useCreateProfile();

  const [handle, setHandle] = useState<string>();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleMint = async () => {
    if (!handle) return;
    if (!address) {
      signInWithWallet();
      return;
    }

    const result = await createProfile({ localName: handle, to: address });

    if (result.isFailure()) {
      return;
    }

    setIsSuccess(true);
  };

  return (
    <FadeSlideBottom>
      <Container size="1" px="4" className="py-10">
        <Heading as="h2" size="4">
          Mint Lens profile
        </Heading>
        <Text className="mt-2" as="p" size="2" color="gray">
          To start using Sigle mint your Lens profile. You can use your profile
          with other Lens apps.
        </Text>

        {isSuccess ? (
          <FadeSlideBottom>
            <Callout.Root className="mt-5" variant="soft">
              <Callout.Icon>
                <IconCheck />
              </Callout.Icon>
              <Callout.Text>
                Your profile has been minted! You can now use Sigle and other
                Lens apps.
                <br />
                <br />
                <b>You need to log in again to select your new profile.</b>
              </Callout.Text>
            </Callout.Root>
          </FadeSlideBottom>
        ) : !handle ? (
          <MintProfileChooseHandleForm onSelectHandle={setHandle} />
        ) : (
          <FadeSlideBottom>
            <Card variant="classic" size="2" className="mt-5 space-y-4">
              <div className="flex gap-5 items-center justify-between border-b border-solid border-gray-6 pb-4 last:border-b-0">
                <Text size="2">Price</Text>
                <Text size="2" weight="medium" color="indigo">
                  {price} MATIC
                </Text>
              </div>
              <div className="flex gap-5 items-center justify-between border-b border-solid border-gray-6 last:border-b-0">
                <Text size="2">Network</Text>
                <Text
                  size="2"
                  weight="medium"
                  className="flex items-center gap-2"
                >
                  <PolygonLogo height={14} width={14} /> Polygon
                </Text>
              </div>
            </Card>

            {env.NEXT_PUBLIC_LENS_ENV === "development" ? (
              <Callout.Root className="mt-5" variant="soft" color="gray">
                <Callout.Icon>
                  <IconInfoCircle />
                </Callout.Icon>
                <Callout.Text>
                  On testnet you can mint a profile for free. You only need to
                  cover the gas fees.
                  <br />
                  You can get free testnet MATIC{" "}
                  <Link href="https://www.alchemy.com/faucets/polygon-amoy">
                    here
                  </Link>
                  .
                </Callout.Text>
              </Callout.Root>
            ) : null}

            <Button
              className="mt-5 w-full"
              size="3"
              loading={isCreating}
              onClick={handleMint}
            >
              Mint for {price} MATIC <IconArrowRight size={16} />
            </Button>

            {error && (
              <Text as="div" size="2" color="red" mt="2">
                {error.message}
              </Text>
            )}
          </FadeSlideBottom>
        )}
      </Container>
    </FadeSlideBottom>
  );
}
