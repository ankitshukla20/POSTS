import AuthCheck from "@/components/AuthCheck";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return <AuthCheck>{children}</AuthCheck>;
}
