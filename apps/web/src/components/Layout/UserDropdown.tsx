import { useLogoutWallet } from "@/hooks/use-logout-wallet";
import { getProfileAvatarUrl, getProfileHandle } from "@/lib/profile";
import { Routes } from "@/lib/routes";
import { SessionType, useSession } from "@lens-protocol/react-web";
import { Avatar, Button, DropdownMenu, IconButton } from "@radix-ui/themes";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePostHog } from "posthog-js/react";
import { useAppSession } from "../Authentication/Session";

export const UserDropdown = () => {
  const posthog = usePostHog();
  const { resolvedTheme, setTheme } = useTheme();
  const { data: session } = useSession();
  const { appSession } = useAppSession();
  const { logoutWithWallet } = useLogoutWallet();

  const onThemeChange = () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    posthog.capture("theme_change", { theme: newTheme });
  };

  if (!session || session.type === SessionType.Anonymous) {
    return null;
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {session.type === SessionType.JustWallet ? (
          <Button variant="outline" size="2">
            {session.address.slice(0, 6)}... {session.address.slice(-4)}
          </Button>
        ) : session.type === SessionType.WithProfile ? (
          <IconButton variant="ghost" size="1">
            <Avatar
              src={getProfileAvatarUrl(session.profile)}
              fallback={
                session.profile.handle?.localName[0] || session.profile.id[0]
              }
              alt={getProfileHandle(session.profile)}
              size="2"
            />
          </IconButton>
        ) : null}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" color="gray" variant="soft">
        {session.type === SessionType.WithProfile && appSession?.whitelisted ? (
          <>
            <DropdownMenu.Item asChild>
              <Link href={"/p/new"}>Write a story</Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item asChild>
              <Link href={"/dashboard/settings"}>Settings</Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item asChild>
              <Link
                href={Routes.userProfile({
                  username: session.profile.handle
                    ? session.profile.handle.localName
                    : session.profile.id,
                })}
              >
                Profile
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
          </>
        ) : null}
        <DropdownMenu.Item onClick={onThemeChange}>
          {resolvedTheme === "dark" ? "Light" : "Dark"} theme
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={logoutWithWallet}>
          Log out
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
