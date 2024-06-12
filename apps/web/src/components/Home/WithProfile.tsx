import { Routes } from "@/lib/routes";
import { SessionType, useSession } from "@lens-protocol/react-web";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSession } from "../Authentication/Session";
import { HomeRestricted } from "./Restricted";

export const HomeWithProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { appSession } = useAppSession();

  useEffect(() => {
    // Redirect to the user profile page if the user is logged in and whitelisted
    if (session?.type === SessionType.WithProfile && appSession?.whitelisted) {
      router.push(
        Routes.userProfile({
          username: session.profile.handle
            ? session.profile.handle.localName
            : session.profile.id,
        }),
      );
    }
  }, [session, appSession, router]);

  if (!appSession?.whitelisted) {
    return <HomeRestricted />;
  }

  return null;
};
