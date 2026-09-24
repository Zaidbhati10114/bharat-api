import type { Metadata } from "next";

import { ThemeProvider } from "@/components/shared/theme-provider";

import { CommandPalette } from "@/components/shared/command-pallete";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "BharatAPI",
  description: "Free APIs for Indian developers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          {children}
          <CommandPalette />
        </ThemeProvider>
      </body>
    </html>
  );
}
