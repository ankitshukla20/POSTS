"use client";
import { useUserContext } from "@/lib/userContext";
import SignOutButton from "./SignOutButton";
import SignInButton from "./SigninButton";
import UsernameForm from "./UsernameForm";

export default function SignupPage() {
  const { user, username } = useUserContext();
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
