import Navbar from "@/components/Navbar";
import { NextThemeProvider } from "@/components/ThemeProvider";
import UserProvider from "@/lib/userContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

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
      <html lang="en" className="min-h-screen">
        <body className={inter.className}>
          <NextThemeProvider>
            <Navbar />
            <main className="px-7 md:px-0 md:container mx-auto md:w-4/5">
              {children}
            </main>
            <Toaster />
          </NextThemeProvider>
        </body>
      </html>
    </UserProvider>
  );
}
