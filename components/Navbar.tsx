import Link from "next/link";
import NavButtons from "./NavButtons";
import ThemeSwitch from "./ThemeSwitch";

export default function Navbar() {
  return (
    <nav className="flex justify-between px-4 md:px-16 xl:px-28 items-center py-4 ">
      <Link href="/">
        {/* <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-violet-600">
          POSTS
        </h1> */}
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-violet-600 transition-transform transform hover:scale-110 hover:shadow-[0_0_10px_rgba(255,0,0,0.8),0_0_20px_rgba(255,105,180,0.8)]">
          POSTS
        </h1>
      </Link>
      <NavButtons />
    </nav>
  );
}
