import type {
  MultirecipientFeeCollectOpenActionSettings,
  Post,
  SimpleCollectOpenActionSettings,
} from "@lens-protocol/react-web";
import { Badge, Button, Card, Heading, Text } from "@radix-ui/themes";
import { useState } from "react";
import { PublicationCollectDialog } from "../Shared/Publication/PublicationCollectDialog";

interface PublicationCollectCardProps {
  publication: Post;
  openActionModule:
    | MultirecipientFeeCollectOpenActionSettings
    | SimpleCollectOpenActionSettings;
}

export const PublicationCollectCard = ({
  publication,
  openActionModule,
}: PublicationCollectCardProps) => {
  const [collectDialogOpen, setCollectDialogOpen] = useState(false);

  return (
    <>
      <Card size="2">
        <div className="flex flex-col gap-1">
          <Heading size="5">
            {openActionModule.collectLimit ? "Limited edition" : "Open edition"}
          </Heading>
          <Text as="div" size="2" weight="medium">
            {openActionModule.amount.value === "0"
              ? "Free"
              : `${openActionModule.amount.value} ${openActionModule.amount.asset.symbol}`}
          </Text>
          {openActionModule.collectLimit ? (
            <div className="flex items-center justify-between">
              <Text as="div" size="2" color="gray">
                {publication.stats.collects}/{openActionModule.collectLimit}{" "}
                mints
              </Text>
              <Badge color="gray">
                {Number(openActionModule.collectLimit) -
                  publication.stats.collects}{" "}
                left
              </Badge>
            </div>
          ) : (
            <Text as="div" size="2" color="gray">
              {publication.stats.collects} minted
            </Text>
          )}
          <Button
            className="w-full"
            mt="2"
            size="3"
            onClick={() => setCollectDialogOpen(true)}
          >
            Collect
          </Button>
        </div>
      </Card>

      <PublicationCollectDialog
        publication={publication}
        open={collectDialogOpen}
        onOpenChange={setCollectDialogOpen}
      />
    </>
  );
};
