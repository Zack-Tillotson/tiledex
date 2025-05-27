import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "../components/Header";

import "./globals.css";
import "@repo/ui/styles";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Pokédex - Explore the World of Pokémon",
  description:
    "Browse and discover information about all Pokémon species from every generation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        <main className="main-content">{children}</main>
      </body>
    </html>
  );
}
