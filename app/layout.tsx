import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Recodd",
    default: "Recodd - The Professional Marketplace for Top Talent",
  },
  description:
    "Connect with top talent and businesses directly. A sophisticated professional marketplace built on trust and clarity.",
  keywords: [
    "freelance",
    "marketplace",
    "professional",
    "developer",
    "designer",
    "hiring",
  ],
  authors: [{ name: "Recodd Team" }],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF9" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0E1A" },
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
        className={`${inter.variable} 
          antialiased
          bg-[rgb(var(--bg))] 
          text-[rgb(var(--text))] 
          min-h-screen
        `}
      >
        {children}
      </body>
    </html>
  );
}
