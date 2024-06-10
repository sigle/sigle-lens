import { getProfileAvatarUrl, getProfileHandle } from "@/lib/profile";
import type { Profile } from "@lens-protocol/react-web";
import { Avatar, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { IconPencil } from "@tabler/icons-react";
import { useState } from "react";
import { UpdateProfileMetadata } from "./UpdateProfileMetadata";

export const ProfileMetadata = ({ profile }: { profile: Profile }) => {
  const [editingProfileMetadata, setEditingProfileMetadata] = useState(false);

  return (
    <Card size="2">
      <div className="space-y-4">
        <div className="flex justify-between">
          <div>
            <Heading size="3">Profile</Heading>
            <Text size="2" color="gray">
              The informations of your profile on Sigle and other Lens apps
            </Text>
          </div>
          {!editingProfileMetadata ? (
            <Button
              variant="soft"
              color="gray"
              onClick={() => setEditingProfileMetadata(true)}
            >
              <IconPencil size={16} />
              Edit
            </Button>
          ) : null}
        </div>

        {!editingProfileMetadata ? (
          <Card size="1">
            <Flex gap="4" align="center">
              <Avatar
                src={getProfileAvatarUrl(profile)}
                fallback={profile.handle?.localName[0] || profile.id[0]}
                alt={getProfileHandle(profile)}
                size="3"
              />
              <Flex direction="column">
                {profile.metadata?.displayName ? (
                  <Text weight="medium">{profile.metadata.displayName}</Text>
                ) : null}
                <Text color="gray">{getProfileHandle(profile)}</Text>
              </Flex>
            </Flex>
          </Card>
        ) : (
          <UpdateProfileMetadata
            profile={profile}
            setEditingProfileMetadata={setEditingProfileMetadata}
          />
        )}
      </div>
    </Card>
  );
};
