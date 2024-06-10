import { env } from "@/env";

export const getPolygonscanTransactionLink = (txHash: string) => {
  return env.NEXT_PUBLIC_LENS_ENV === "production"
    ? `https://polygonscan.com/tx/${txHash}`
    : `https://amoy.polygonscan.com/tx/${txHash}`;
};

export const getPolygonscanAddressLink = (address: string) => {
  return env.NEXT_PUBLIC_LENS_ENV === "production"
    ? `https://polygonscan.com/address/${address}`
    : `https://amoy.polygonscan.com/address/${address}`;
};
