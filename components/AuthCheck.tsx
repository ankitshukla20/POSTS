"use client";
import { useUserContext } from "@/lib/userContext";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}
export default function AuthCheck({ children, fallback }: Props) {
  const { username } = useUserContext();
  return username
    ? children
    : fallback || (
        <div className="flex flex-col items-center justify-center h-[80vh] p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Access Restricted</h2>
          <p className="text-lg mb-6">
            You must be signed in to access this page.
          </p>
          <Link
            href="/enter"
            className="text-blue-500 underline hover:text-blue-700"
          >
            Click here to sign in
          </Link>
        </div>
      );
}
