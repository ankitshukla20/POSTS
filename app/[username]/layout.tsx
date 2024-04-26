import { Metadata } from "next";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "POSTS - Profile Page",
};

export default function UserLayout({ children }: Props) {
  return <>{children}</>;
}
