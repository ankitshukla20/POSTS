import AuthCheck from "@/components/AuthCheck";
import { Metadata } from "next";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Add/Edit Post",
  description: "Create new posts or modify existing ones.",
};

export default function AdminLayout({ children }: Props) {
  return <AuthCheck>{children}</AuthCheck>;
}
