import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function DocsPagination() {
  return (
    <div className="mt-16 grid gap-4 sm:grid-cols-2">
      <Link
        href="/docs"
        className="hover:bg-muted/50 rounded-2xl border p-5 transition hover:border-orange-500"
      >
        <div className="flex items-center gap-3">
          <ArrowLeft className="size-4" />
          <div>
            <p className="text-muted-foreground text-xs">Previous</p>
            <p className="font-medium">Documentation</p>
          </div>
        </div>
      </Link>

      <Link
        href="/playground"
        className="hover:bg-muted/50 rounded-2xl border p-5 transition hover:border-orange-500"
      >
        <div className="flex items-center justify-end gap-3">
          <div className="text-right">
            <p className="text-muted-foreground text-xs">Next</p>
            <p className="font-medium">API Playground</p>
          </div>

          <ArrowRight className="size-4" />
        </div>
      </Link>
    </div>
  );
}
