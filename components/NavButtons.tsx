"use client";
import { useUserContext } from "@/lib/userContext";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { auth } from "@/lib/firebase";
import ThemeSwitch from "./ThemeSwitch";

export default function NavButtons() {
  const { user, username } = useUserContext();

  const userPhoto = user?.photoURL || "/avatar.svg";

  const signOut = () => {
    auth.signOut().then(() => console.log("Logout Success"));
  };

  return (
    <ul>
      {username && (
        <div className="flex gap-6 items-center">
          <li>
            <Button variant="outline" onClick={signOut}>
              Sign out
            </Button>
          </li>
          <li>
            <Link href="/admin">
              <Button className="hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 bg-gradient-to-r from-blue-500 to-pink-500 text-white">
                Write Post
              </Button>
            </Link>
          </li>
          <li>
            <Link href={`/${username}`}>
              <Avatar>
                <AvatarImage src={`${userPhoto}`} />
                <AvatarFallback>{user?.displayName?.charAt(0)}</AvatarFallback>
              </Avatar>
            </Link>
          </li>
          <ThemeSwitch />
        </div>
      )}
      {!username && (
        <div className="flex gap-6 items-center">
          <li>
            <Link href="/enter">
              <Button>Signin</Button>
            </Link>
          </li>
          <ThemeSwitch />
        </div>
      )}
    </ul>
  );
}
