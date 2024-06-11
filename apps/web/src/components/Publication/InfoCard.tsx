import { ArweaveLogo } from "@/images/ArweaveLogo";
import { PolygonLogo } from "@/images/PolygonLogo";
import { getPolygonscanTransactionLink } from "@/lib/links";
import { prettifyUrl } from "@/lib/prettify-url";
import type { Post } from "@lens-protocol/react-web";
import { Card, Separator, Text } from "@radix-ui/themes";
import { IconExternalLink } from "@tabler/icons-react";
import Link from "next/link";

interface PublicationInfoCardProps {
  publication: Post;
}

export const PublicationInfoCard = ({
  publication,
}: PublicationInfoCardProps) => {
  const metadataLink = publication.metadata.rawURI;

  return (
    <Card size="2">
      <div className="space-y-2">
        <div>
          <Link href={metadataLink} target="_blank" className="space-y-1">
            <Text
              as="div"
              size="1"
              color="gray"
              className="flex items-center gap-2 uppercase"
            >
              <ArweaveLogo height={18} width={18} />
              Arweave transaction
              <IconExternalLink size={14} />
            </Text>
            <Text as="div" size="2" color="gray" className="truncate">
              {prettifyUrl(metadataLink)}
            </Text>
          </Link>
        </div>
        {publication.txHash ? (
          <>
            <Separator orientation="horizontal" className="w-full" />
            <div>
              <Link
                href={getPolygonscanTransactionLink(publication.txHash)}
                target="_blank"
                className="space-y-1"
              >
                <Text
                  as="div"
                  size="1"
                  color="gray"
                  className="flex items-center gap-2 uppercase"
                >
                  <PolygonLogo height={18} width={16} />
                  Transaction
                  <IconExternalLink size={14} />
                </Text>
                <Text as="div" size="2" color="gray" className="truncate">
                  {publication.txHash}
                </Text>
              </Link>
            </div>
          </>
        ) : null}
      </div>
    </Card>
  );
};
