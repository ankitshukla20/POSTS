"use client";
import { Button } from "@/components/ui/button";
import { auth, googleAuthProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

export default function SignInButton() {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider).then((res) =>
      console.log(res)
    );
  };

  return (
    <div className="flex justify-center">
      <Button variant="secondary" className="p-6" onClick={signInWithGoogle}>
        <FcGoogle size={35} /> <p className="pl-3">Sign in with Google</p>
      </Button>
    </div>
  );
}
