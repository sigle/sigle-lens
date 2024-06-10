import { getBoringAvatarUrl } from "@/lib/profile";
import {
  type Profile,
  useProfileManagers,
  useUpdateProfileManagers,
} from "@lens-protocol/react-web";
import {
  Avatar,
  Button,
  Callout,
  Card,
  Flex,
  Heading,
  Spinner,
  Text,
} from "@radix-ui/themes";
import { IconInfoCircle, IconPlus } from "@tabler/icons-react";
import { usePostHog } from "posthog-js/react";
import { useState } from "react";
import { toast } from "sonner";
import { AddManagerDialog } from "./AddManagerDialog";

export const ProfileManagers = ({ profile }: { profile: Profile }) => {
  const [addManagerDialogOpen, setAddManagerDialogOpen] = useState(false);
  const {
    data: managers,
    error: errorManagers,
    loading: loadingManagers,
  } = useProfileManagers({
    for: profile.id,
  });

  return (
    <Card size="2">
      <div className="space-y-4">
        <div className="flex justify-between">
          <div>
            <Heading size="3">Profile Managers</Heading>
            <Text size="2" color="gray">
              Accounts with control over your profile that can act on your
              behalf
            </Text>
          </div>
          <Button
            variant="soft"
            color="gray"
            onClick={() => setAddManagerDialogOpen(true)}
          >
            <IconPlus size={16} />
            Add manager
          </Button>
        </div>

        {loadingManagers ? (
          <Flex justify="center" py="3">
            <Spinner />
          </Flex>
        ) : null}

        {errorManagers ? (
          <Callout.Root color="red">
            <Callout.Icon>
              <IconInfoCircle />
            </Callout.Icon>
            <Callout.Text>{errorManagers.message}</Callout.Text>
          </Callout.Root>
        ) : null}

        <div className="space-y-2">
          {managers?.map((manager) => (
            <ProfileManagerItem key={manager.address} manager={manager} />
          ))}
        </div>
      </div>

      <AddManagerDialog
        open={addManagerDialogOpen}
        onOpenChange={setAddManagerDialogOpen}
      />
    </Card>
  );
};

const ProfileManagerItem = ({
  manager,
}: {
  manager: {
    isLensManager: boolean;
    address: string;
  };
}) => {
  const posthog = usePostHog();
  const {
    execute: updateProfileManager,
    loading: loadingUpdateProfileManager,
  } = useUpdateProfileManagers();

  const onRemoveProfileManager = async (address: string) => {
    const ok = confirm("Are you sure you want to remove this profile manager?");
    if (!ok) return;

    const resultUpdateProfile = await updateProfileManager({
      remove: [address],
    });
    if (resultUpdateProfile.isFailure()) {
      toast.error("Error removing profile manager", {
        description: resultUpdateProfile.error.message,
      });
      return;
    }

    posthog.capture("remove_profile_manager", {
      address: address,
    });
    toast.message("Profile manager removed");
  };

  return (
    <Flex gap="4" justify="between" align="center">
      <Flex gap="4" align="center">
        <Avatar
          src={
            manager.isLensManager
              ? "/images/lens-logo.jpg"
              : getBoringAvatarUrl(manager.address)
          }
          fallback={manager.address[0]}
          alt={manager.isLensManager ? "Lens Profile Manager" : manager.address}
          size="3"
        />
        <Flex direction="column">
          <Text weight="medium">
            {manager.isLensManager ? "Lens Profile Manager" : manager.address}
          </Text>
          {manager.isLensManager ? (
            <Text size="1" color="gray">
              Used for signless & gasless transactions
            </Text>
          ) : null}
        </Flex>
      </Flex>
      {loadingUpdateProfileManager ? (
        <Spinner className="mr-1 size-5" />
      ) : (
        <Button
          variant="soft"
          onClick={() => onRemoveProfileManager(manager.address)}
        >
          Remove
        </Button>
      )}
    </Flex>
  );
};
