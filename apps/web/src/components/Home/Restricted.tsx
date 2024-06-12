import { Container, Heading, Link, Text } from "@radix-ui/themes";
import { FadeSlideBottom } from "../ui/animations/FadeSlideBottom";

export const HomeRestricted = () => {
  return (
    <FadeSlideBottom>
      <Container size="1" className="py-10">
        <Heading as="h1" size="4">
          Thanks for your interest in Sigle!
        </Heading>
        <Text as="p" className="mt-5">
          We are currently in closed beta and limiting the access to the
          platform. You can request access by opening a ticket on our{" "}
          <Link href="https://app.sigle.io/discord" target="_blank">
            Discord
          </Link>
          .
        </Text>
      </Container>
    </FadeSlideBottom>
  );
};
