import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "%s | Recodd",
  description:
    "Connect with top talent and businesses directly. No middlemen, no fees, just work.",
  keywords: [
    "freelance",
    "marketplace",
    "commission-free",
    "developer",
    "designer",
  ],
  authors: [{ name: "Recodd Team" }],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" }, // Matches Zinc-950
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} 
          ${geistMono.variable} 
          antialiased
          bg-[rgb(var(--bg))] 
          text-[rgb(var(--text))] 
          transition-colors duration-300
          selection:bg-rose-500/30 selection:text-rose-600 dark:selection:text-rose-400
        `}
      >
        {children}
      </body>
    </html>
  );
}
