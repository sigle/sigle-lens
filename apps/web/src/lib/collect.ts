import { OpenActionModuleType } from "@lens-protocol/client";
import type {
  MultirecipientFeeCollectOpenActionSettings,
  Post,
  SimpleCollectOpenActionSettings,
} from "@lens-protocol/react-web";

export const getOpenActionModule = (
  publication: Post,
):
  | MultirecipientFeeCollectOpenActionSettings
  | SimpleCollectOpenActionSettings
  | undefined => {
  const openActionModule = publication.openActionModules?.find(
    (module) =>
      module.type === OpenActionModuleType.SimpleCollectOpenActionModule ||
      module.type ===
        OpenActionModuleType.MultirecipientFeeCollectOpenActionModule,
  ) as
    | MultirecipientFeeCollectOpenActionSettings
    | SimpleCollectOpenActionSettings
    | undefined;
  return openActionModule;
};
