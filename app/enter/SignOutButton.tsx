"use client";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";

export default function SignOutButton() {
  const signOut = () => {
    auth.signOut().then(() => console.log("Logout Success"));
  };

  return (
    <div className="flex justify-center">
      <Button variant="outline" className="p-6" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}
