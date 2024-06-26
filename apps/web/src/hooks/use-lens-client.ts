import { lensEnvironment } from "@/lib/lens";
import { LensClient } from "@lens-protocol/client";
import { useStorage } from "@lens-protocol/react-web";
import { useMemo } from "react";

/**
 * Return the LensClient authenticated with the current session
 */
export const useLensClient = () => {
  const storage = useStorage();
  const client = useMemo(
    () =>
      new LensClient({
        environment: lensEnvironment,
        storage,
      }),
    [storage],
  );

  return client;
};
