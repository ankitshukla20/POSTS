"use client";
import { useUserContext } from "@/lib/userContext";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { auth } from "@/lib/firebase";

export default function NavButtons() {
  const { user, username } = useUserContext();

  const signOut = () => {
    auth.signOut().then(() => console.log("Logout Success"));
  };

  return (
    <ul>
      {username && (
        <div className="flex gap-6 items-center">
          <li>
            <Button variant="secondary" onClick={signOut}>
              Sign out
            </Button>
          </li>
          <li>
            <Link href="/admin">
              <Button>Write Posts</Button>
            </Link>
          </li>
          <li>
            <Link href={`${username}`}>
              <Avatar>
                <AvatarImage src={`${user?.photoURL}`} />
                <AvatarFallback>{user?.displayName?.charAt(0)}</AvatarFallback>
              </Avatar>
            </Link>
          </li>
        </div>
      )}
      {!username && (
        <li>
          <Link href="/enter">
            <Button>Signin</Button>
          </Link>
        </li>
      )}
    </ul>
  );
}
