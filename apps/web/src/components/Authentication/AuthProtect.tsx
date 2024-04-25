import { Callout, Flex, Spinner } from "@radix-ui/themes";
import { SessionType, useSession } from "@lens-protocol/react-web";
import { IconInfoCircle } from "@tabler/icons-react";

interface AuthProtectProps {
  children?: React.ReactNode;
}

export const AuthProtect = ({ children }: AuthProtectProps) => {
  const { data: session } = useSession();

  if (session?.type === SessionType.WithProfile) {
    return <>{children}</>;
  }
  if (session?.type === SessionType.Anonymous) {
    return (
      <Flex justify="center" py="7">
        <Callout.Root color="gray">
          <Callout.Icon>
            <IconInfoCircle />
          </Callout.Icon>
          <Callout.Text>
            You need to be signed in to access this page.
          </Callout.Text>
        </Callout.Root>
      </Flex>
    );
  }

  return (
    <Flex justify="center" py="7">
      <Spinner />
    </Flex>
  );
};
