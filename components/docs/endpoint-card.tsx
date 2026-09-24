import { Badge } from "@/components/ui/badge";
import { CodeTabs } from "./code-tabs";
import { ApiDoc } from "@/lib/docs/types";

interface EndpointCardProps {
  doc: Pick<ApiDoc, "endpoint" | "examples">;
}

export function EndpointCard({ doc }: EndpointCardProps) {
  const tabs = [
    doc.examples.curl && {
      label: "cURL",
      language: "bash",
      code: doc.examples.curl,
    },
    doc.examples.javascript && {
      label: "JavaScript",
      language: "javascript",
      code: doc.examples.javascript,
    },
    doc.examples.typescript && {
      label: "TypeScript",
      language: "typescript",
      code: doc.examples.typescript,
    },
    doc.examples.python && {
      label: "Python",
      language: "python",
      code: doc.examples.python,
    },
    doc.examples.go && {
      label: "Go",
      language: "go",
      code: doc.examples.go,
    },
    doc.examples.java && {
      label: "Java",
      language: "java",
      code: doc.examples.java,
    },
    doc.examples.csharp && {
      label: "C#",
      language: "csharp",
      code: doc.examples.csharp,
    },
    doc.examples.php && {
      label: "PHP",
      language: "php",
      code: doc.examples.php,
    },
    doc.examples.ruby && {
      label: "Ruby",
      language: "ruby",
      code: doc.examples.ruby,
    },
    doc.examples.swift && {
      label: "Swift",
      language: "swift",
      code: doc.examples.swift,
    },
  ].filter(Boolean) as {
    label: string;
    language: string;
    code: string;
  }[];

  return (
    <div className="bg-card space-y-6 rounded-3xl border p-8 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <Badge label={doc.endpoint.method} color="success" />

        <code className="bg-muted rounded-lg px-3 py-1.5 font-mono text-sm">
          {doc.endpoint.path}
        </code>
      </div>

      <p className="text-muted-foreground leading-7">
        {doc.endpoint.description}
      </p>

      <CodeTabs tabs={tabs} />
    </div>
  );
}
