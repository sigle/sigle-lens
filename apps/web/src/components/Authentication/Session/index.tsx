"use client";

import { useProfileServiceGetApiProfile } from "@/__generated__/opanapi/queries";
import { LogoImage } from "@/images/Logo";
import { SessionType, useSession } from "@lens-protocol/react-web";
import { Spinner } from "@radix-ui/themes";
import { useEffect } from "react";
import { useSessionStore } from "./store";

interface SessionProviderProps {
  children: React.ReactNode;
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const setSession = useSessionStore((state) => state.setSession);
  const { data: session } = useSession();
  const { data: profile, isLoading: isLoadingProfile } =
    useProfileServiceGetApiProfile(undefined, {
      enabled: session?.type === SessionType.WithProfile,
    });

  useEffect(() => {
    if (session?.type === SessionType.WithProfile && profile) {
      setSession(profile);
    }
  }, [setSession, session, profile]);

  const showLoader = !session || isLoadingProfile;

  return (
    <>
      {children}
      {showLoader ? (
        <div className="fixed z-30 top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-1">
          <LogoImage height={28} />
          <Spinner className="mt-5" size="2" />
        </div>
      ) : null}
    </>
  );
};

export const useAppSession = () => {
  const appSession = useSessionStore((state) => state.session);
  return { appSession };
};
