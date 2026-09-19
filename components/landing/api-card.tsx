import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ApiCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  endpoint: string;
}

export function ApiCard({ icon, title, description, endpoint }: ApiCardProps) {
  return (
    <Card className="group bg-background/70 flex h-full flex-col rounded-3xl border p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/30 hover:shadow-xl">
      <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
        {icon}
      </div>

      <h3 className="text-xl font-semibold">{title}</h3>

      <p className="text-muted-foreground mt-3 flex-1 text-sm leading-6">
        {description}
      </p>

      <div className="bg-muted/50 mt-6 rounded-xl border p-3">
        <code className="font-mono text-xs text-orange-500">
          GET {endpoint}
        </code>
      </div>

      <Link
        href="/docs"
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-orange-500 transition-all duration-200 group-hover:gap-3"
      >
        View Docs
        <ArrowRight className="size-4" />
      </Link>
    </Card>
  );
}
