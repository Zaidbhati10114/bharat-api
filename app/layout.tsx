import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/shared/theme-provider";
import "./globals.css";
import { CommandPalette } from "@/components/shared/command-pallete";

const inter = Inter({
  subsets: ["latin"],
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
      <body className={inter.className}>
        <ThemeProvider>
          {children}
          <CommandPalette />
        </ThemeProvider>
      </body>
    </html>
  );
}
