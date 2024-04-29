"use client";

import { AuthProtect } from "@/components/Authentication/AuthProtect";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProtect>{children}</AuthProtect>;
}
