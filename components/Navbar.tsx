import Link from "next/link";
import NavButtons from "./NavButtons";

export default function Navbar() {
  return (
    <nav className="flex justify-around items-center py-4 border-b">
      <Link href="/">
        <h1 className="text-2xl font-bold">POSTS</h1>
      </Link>
      <NavButtons />
    </nav>
  );
}
