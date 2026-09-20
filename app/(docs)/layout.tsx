import { ReactNode } from "react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { CommandPalette } from "@/components/shared/command-pallete";

export default function DocsRouteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <CommandPalette />
      {children}
      <Footer />
    </>
  );
}
