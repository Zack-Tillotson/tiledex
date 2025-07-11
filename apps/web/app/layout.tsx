import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "../components/Header";
import { QueryProvider } from "../components/QueryProvider";

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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#00a9a9',
  colorScheme: 'light',
};

export const metadata: Metadata = {
  title: {
    template: '%s | TiledEx',
    default: 'TiledEx - Create Your Pokémon Story',
  },
  description: 'Craft your own Pokémon adventure with TiledEx. Build your roster, research Pokémon, and bring your story to life in the Pokémon world.',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'TiledEx',
  },
  icons: {
    icon: [
      { url: '/images/brand/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/brand/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/images/brand/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/brand/favicon-256.png', sizes: '256x256', type: 'image/png' },
      { url: '/images/brand/favicon-512.png', sizes: '512x512', type: 'image/png' }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <QueryProvider>
          <Header />
          <main className="main-content">{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
