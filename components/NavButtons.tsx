"use client";
import { useUserContext } from "@/lib/userContext";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export default function NavButtons() {
  const { user, username } = useUserContext();

  return (
    <ul>
      {username && (
        <div className="flex gap-6 items-center">
          <li>
            <Link href="/admin">
              <Button>Write Posts</Button>
            </Link>
          </li>
          <li>
            <Link href={`${username}`}>
              <Avatar>
                <AvatarImage src="#" />
                <AvatarFallback>P</AvatarFallback>
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
