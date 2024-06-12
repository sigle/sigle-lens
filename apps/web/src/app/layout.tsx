import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/Authentication/Session";
import { env } from "@/env";
import { cn } from "@/lib/cn";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  applicationName: "Sigle",
  title: "Sigle | Where Web3 stories come to life",
  description:
    "Sigle is a decentralised open-source platform empowering Web3 creators. Write, share and lock your stories on the blockchain.",
  openGraph: {
    images: [`${env.NEXT_PUBLIC_APP_URL}/images/share.png`],
  },
  twitter: {
    creator: "@sigleapp",
    site: "www.sigle.io",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(inter.className, "antialiased")}
        suppressHydrationWarning
      >
        <Providers>
          <SessionProvider>{children}</SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
