"use client";
import { useUserContext } from "@/lib/userContext";
import SignOutButton from "./SignOutButton";
import SignInButton from "./SigninButton";
import UsernameForm from "./UsernameForm";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { user, username } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (user && username) {
      router.push("/");
    }
  }, [user, username]);

  return (
    <div className="pt-10">
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </div>
  );
}
