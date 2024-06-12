"use client";

import { HomeLogin } from "@/components/Home/Login";
import { HomeRestricted } from "@/components/Home/Restricted";
import { HomeWithProfile } from "@/components/Home/WithProfile";
import { SessionType, useSession } from "@lens-protocol/react-web";
import { Container, Spinner } from "@radix-ui/themes";

export default function Home() {
  const { data: session } = useSession();

  if (session?.type === SessionType.Anonymous) {
    return <HomeLogin />;
  }

  if (session?.type === SessionType.JustWallet) {
    return <HomeRestricted />;
  }

  if (session?.type === SessionType.WithProfile) {
    return <HomeWithProfile />;
  }

  return (
    <Container>
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    </Container>
  );
}
