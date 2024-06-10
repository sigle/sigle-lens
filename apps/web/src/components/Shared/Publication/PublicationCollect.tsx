import { getProfileAvatarUrl, getProfileHandle } from "@/lib/profile";
import { OpenActionCategoryType } from "@lens-protocol/client";
import {
  LimitType,
  type Post,
  useWhoActedOnPublication,
} from "@lens-protocol/react-web";
import { Avatar, Badge, Button } from "@radix-ui/themes";
import { IconCards } from "@tabler/icons-react";
import { useState } from "react";
import { PublicationCollectDialog } from "../Shared/Publication/PublicationCollectDialog";

interface PublicationCollectProps {
  publication: Post;
}

export const PublicationCollect = ({
  publication,
}: PublicationCollectProps) => {
  const [collectDialogOpen, setCollectDialogOpen] = useState(false);
  const { data: whoCollected } = useWhoActedOnPublication({
    on: publication.id,
    limit: LimitType.Ten,
    where: {
      anyOf: [
        {
          category: OpenActionCategoryType.Collect,
        },
      ],
    },
  });

  return (
    <>
      <div className="flex items-center gap-2">
        {whoCollected && whoCollected.length > 0 ? (
          <div className="flex items-end -space-x-1">
            <div className="-space-x-2">
              {whoCollected.slice(0, 3).map((profile) => (
                <Avatar
                  key={profile.id}
                  src={getProfileAvatarUrl(profile)}
                  fallback={profile.handle?.localName[0] || profile.id[0]}
                  alt={getProfileHandle(profile)}
                  size="1"
                  style={{
                    boxShadow: "0px 0px 0px 1px var(--color-page-background)",
                  }}
                />
              ))}
            </div>
            <Badge
              color="gray"
              className="h-[--space-5] bg-[--accent-3]"
              style={{
                boxShadow: "0px 0px 0px 1px var(--color-page-background)",
              }}
            >
              {publication.stats.collects} collected
            </Badge>
          </div>
        ) : null}

        <Button
          size="1"
          variant="soft"
          onClick={() => setCollectDialogOpen(true)}
        >
          Collect
          <IconCards size={16} />
        </Button>
      </div>

      <PublicationCollectDialog
        publication={publication}
        open={collectDialogOpen}
        onOpenChange={setCollectDialogOpen}
      />
    </>
  );
};
