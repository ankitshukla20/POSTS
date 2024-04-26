"use client";

import { useTheme } from "next-themes";
import { FaSun } from "react-icons/fa";
import { IoMdMoon } from "react-icons/io";

import { Button } from "@/components/ui/button";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {theme === "light" ? (
        <>
          <IoMdMoon className="h-[1.2rem] w-[1.2rem] text-purple-600" />
        </>
      ) : (
        <>
          <FaSun className="h-[1.2rem] w-[1.2rem] text-amber-400" />
        </>
      )}
    </Button>
  );
}
