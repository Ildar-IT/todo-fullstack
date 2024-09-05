import React from "react";
import AuthLayout from "@/components/screens/auth/authLayout";

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
