import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <main className="bg-background text-foreground relative min-h-screen overflow-hidden">
        {children}
      </main>

      <Footer />
    </>
  );
}
