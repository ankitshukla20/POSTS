import Link from "next/link";
import NavButtons from "./NavButtons";

export default function Navbar() {
  return (
    <nav className="flex justify-between px-4 md:px-16 xl:px-28 items-center py-4 border-b dark:bg-gray-950">
      <Link href="/">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-violet-600">
          POSTS
        </h1>
      </Link>
      <NavButtons />
    </nav>
  );
}
