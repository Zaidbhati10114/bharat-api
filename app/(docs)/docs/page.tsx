import Link from "next/link";
import { Container } from "@/components/shared/container";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { getInfo } from "@/lib/openapi";

export default function DocsPage() {
  const info = getInfo();
  return (
    <>
      {/* <Navbar />

      <main className="py-20">
        <Container>
          <p className="font-medium text-orange-500">Documentation</p>

          <h1 className="mt-3 text-5xl font-bold tracking-tight">
            BharatAPI Docs
          </h1>

          <p className="text-muted-foreground mt-6 max-w-2xl text-lg">
            Explore free APIs built for Indian developers.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/docs/pincode"
              className="rounded-2xl border p-6 transition hover:border-orange-500 hover:shadow-lg"
            >
              <h3 className="font-semibold">Pincode API</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Lookup Indian PIN codes instantly.
              </p>
            </Link>
          </div>
        </Container>
      </main>

      <Footer /> */}
      <div className="p-10">
        <h1>{info.title}</h1>
        <p>{info.version}</p>
        <p>{info.description}</p>
      </div>
    </>
  );
}
