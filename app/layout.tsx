import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import UserProvider from "@/lib/userContext";
import { NextThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "POSTS",
  description:
    "A blogging siteUnleash your creativity on POSTS. Write, read, and engage with high-quality content from across the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <html lang="en" className="">
        <body className={inter.className}>
          <NextThemeProvider>
            <Navbar />
            <main className="container mx-auto md:w-4/5">{children}</main>
            <Toaster />
          </NextThemeProvider>
        </body>
      </html>
    </UserProvider>
  );
}
