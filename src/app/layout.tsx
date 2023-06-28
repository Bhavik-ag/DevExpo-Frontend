import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import { ReduxProvider } from "@/store/provider";
import type { Metadata } from "next";
import { Setup } from "./utils";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevExpo",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-white min-h-screen flex flex-col dark:bg-gray-900`}
      >
        <ReduxProvider>
          <Setup />
          <Navbar selected="Home" />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
