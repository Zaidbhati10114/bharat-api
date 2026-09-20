import { Badge } from "@/components/ui/badge";
import { CodeTabs } from "./code-tabs";
import { ApiDoc } from "@/lib/docs/types";

interface EndpointCardProps {
  doc: Pick<ApiDoc, "endpoint" | "examples">;
}

export function EndpointCard({ doc }: EndpointCardProps) {
  return (
    <div className="bg-card space-y-6 rounded-3xl border p-8 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <Badge label={doc.endpoint.method} color="success" />

        <code className="bg-muted rounded-lg px-3 py-1.5 text-sm">
          {doc.endpoint.path}
        </code>
      </div>

      <p className="text-muted-foreground leading-8">
        {doc.endpoint.description}
      </p>

      <CodeTabs examples={doc.examples} />
    </div>
  );
}
