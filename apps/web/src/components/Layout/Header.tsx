"use client";

import { SessionType, useSession } from "@lens-protocol/react-web";
import { Button, Flex, IconButton } from "@radix-ui/themes";
import Link from "next/link";
import { useTheme } from "next-themes";
import { IconSun } from "@tabler/icons-react";
import { usePostHog } from "posthog-js/react";
import { LogoImage } from "@/images/Logo";
import { useSignInWallet } from "@/hooks/use-sign-in-wallet";
import { SelectProfileDialog } from "../Authentication/SelectProfileDialog";
import { useAuthenticationStore } from "../Authentication/store";
import { RegisterProfileDialog } from "../Authentication/RegisterProfileDialog";
import { UserDropdown } from "./UserDropdown";

export const Header = () => {
  const posthog = usePostHog();
  const { signInWithWallet } = useSignInWallet();
  const { data: session, loading: loadingSession } = useSession();
  const { resolvedTheme, setTheme } = useTheme();
  const setRegisterProfileOpen = useAuthenticationStore(
    (state) => state.setRegisterProfileOpen
  );

  const onThemeChange = () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    posthog.capture("theme_change", { theme: newTheme });
  };

  return (
    <>
      <header className="sticky top-0 z-20 flex h-[--header-height] items-center justify-between border-b border-gray-6 bg-[var(--color-background)] px-4 md:px-[60px]">
        <Link href="/">
          <LogoImage height={28} />
        </Link>
        {session?.type === SessionType.Anonymous ? (
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              color="gray"
              highContrast
              disabled={loadingSession}
              onClick={signInWithWallet}
            >
              Write on Sigle
            </Button>
            <Button
              color="gray"
              highContrast
              disabled={loadingSession}
              onClick={signInWithWallet}
            >
              Sign In
            </Button>
            <IconButton
              variant="ghost"
              color="gray"
              highContrast
              onClick={onThemeChange}
            >
              <IconSun size={16} />
            </IconButton>
          </div>
        ) : null}
        {session?.type === SessionType.JustWallet ||
        session?.type === SessionType.WithProfile ? (
          <Flex align="center" gap="5">
            {session?.type === SessionType.WithProfile ? (
              <Button color="gray" highContrast asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : null}
            {session?.type === SessionType.JustWallet ? (
              <Button
                variant="ghost"
                color="gray"
                highContrast
                onClick={() => setRegisterProfileOpen(true)}
              >
                Write on Sigle
              </Button>
            ) : null}
            <UserDropdown />
          </Flex>
        ) : null}
      </header>

      <SelectProfileDialog />
      <RegisterProfileDialog />
    </>
  );
};