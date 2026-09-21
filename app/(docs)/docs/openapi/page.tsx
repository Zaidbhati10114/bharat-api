import type { Metadata } from "next";
import { Download } from "lucide-react";
import { Reference } from "./reference";
import { OpenApiReference } from "@/components/docs/openapi-reference";

export const metadata: Metadata = {
  title: "OpenAPI Reference",
  description: "Interactive BharatAPI reference.",
};

export default function OpenApiPage() {
  return (
    <main className="mx-auto max-w-[1440px] px-6 py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">OpenAPI Reference</h1>

          <p className="text-muted-foreground mt-3">
            Interactive API reference generated automatically from
            <code className="bg-muted mx-1 rounded px-1 py-0.5">
              openapi.yaml
            </code>
          </p>
        </div>

        <a
          href="/openapi.json"
          download
          className="hover:bg-muted inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition"
        >
          <Download className="size-4" />
          Download OpenAPI JSON
        </a>
      </div>

      <div className="bg-background overflow-hidden rounded-3xl border">
        <OpenApiReference />
      </div>
    </main>
  );
}
