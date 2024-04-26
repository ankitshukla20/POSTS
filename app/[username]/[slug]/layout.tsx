import { Metadata } from "next";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "POSTS - Post Page",
};

export default function PostLayout({ children }: Props) {
  return <>{children}</>;
}
