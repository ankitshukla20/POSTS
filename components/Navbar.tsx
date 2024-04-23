import Link from "next/link";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Navbar() {
  const user = null;
  const username = null;

  return (
    <nav className="flex justify-around items-center py-4 border-b">
      <Link href="/">
        <h1 className="text-2xl font-bold">POSTS</h1>
      </Link>
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
    </nav>
  );
}
