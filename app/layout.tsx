import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import UserProvider from "@/lib/userContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <main className="container mx-auto">{children}</main>
          <Toaster />
        </body>
      </html>
    </UserProvider>
  );
}
