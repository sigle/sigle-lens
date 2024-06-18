"use client";

import { useProfileServiceGetApiProfile } from "@/__generated__/opanapi/queries";
import { SessionType, useSession } from "@lens-protocol/react-web";
import { useEffect } from "react";
import { useSessionStore } from "./store";

interface SessionProviderProps {
  children: React.ReactNode;
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const setSession = useSessionStore((state) => state.setSession);
  const { data: session } = useSession();
  const { data: profile } = useProfileServiceGetApiProfile(undefined, {
    enabled: session?.type === SessionType.WithProfile,
  });

  useEffect(() => {
    if (session?.type === SessionType.WithProfile && profile) {
      setSession(profile);
    }
  }, [setSession, session, profile]);

  return children;
};

export const useAppSession = () => {
  const appSession = useSessionStore((state) => state.session);
  return { appSession };
};
