import { DocsBreadcrumbs } from "./breadcrumbs";
import { EndpointCard } from "./endpoint-card";
import { ResponseCard } from "./response-card";
import { DocsPagination } from "./docs-pagination";
import { Badge } from "@/components/ui/badge";
import { ApiDoc } from "@/lib/docs/types";
import { ApiPlayground } from "./api-playground";
import { DatasetMetadata } from "./dataset-metadata";

interface DocsPageProps {
  doc: ApiDoc;
}

export function DocsPage({ doc }: DocsPageProps) {
  return (
    <article className="typeset">
      {/* Hero */}
      <section id="overview" className="space-y-10">
        <DocsBreadcrumbs title={doc.title} />

        <div className="space-y-8">
          <Badge label="Documentation" color="info" />

          <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
            {doc.title}
          </h1>

          <p className="text-muted-foreground max-w-3xl text-xl leading-9">
            {doc.description}
          </p>
        </div>

        <div className="text-muted-foreground max-w-3xl space-y-8 text-[17px] leading-9">
          <p>
            BharatAPI&apos;s Pincode API provides fast and reliable Indian PIN
            code lookup using an optimized postal dataset designed for
            production workloads.
          </p>

          <p>
            Every request returns predictable JSON responses containing state,
            district, and block information while remaining edge cached for
            low-latency responses across India.
          </p>
        </div>
      </section>

      {/* Endpoint */}
      <section id="endpoint" className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Lookup Endpoint</h2>

          <p className="text-muted-foreground max-w-3xl text-[17px] leading-8">
            Retrieve location details for any valid 6-digit Indian PIN code
            using a simple GET request.
          </p>
        </div>

        <EndpointCard doc={doc} />
      </section>

      {/* Live */}
      <section id="playground" className="space-y-8 pt-20">
        <div className="space-y-4">
          <h2>API Explorer</h2>

          <p>
            Send real requests to the live BharatAPI endpoint and inspect the
            actual response.
          </p>
        </div>

        <ApiPlayground
          method="GET"
          endpoint="/api/v1/pincode/{code}"
          placeholder="421201"
          paramName="code"
          validatePattern="^[0-9]{6}$"
        />
      </section>

      {/* Response */}
      <section id="response" className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">
            Example Response
          </h2>

          <p className="text-muted-foreground max-w-3xl text-[17px] leading-8">
            A successful request returns a structured JSON object containing
            state, district, and block information.
          </p>
        </div>

        <ResponseCard response={doc.exampleResponse} />
      </section>

      {/* Errors */}
      <section id="errors" className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Error Codes</h2>

          <p className="text-muted-foreground max-w-3xl text-[17px] leading-8">
            Consistent HTTP status codes make client-side error handling simple
            and predictable.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-6 py-5 text-left font-semibold">Status</th>
                <th className="px-6 py-5 text-left font-semibold">Code</th>
                <th className="hidden px-6 py-5 text-left font-semibold md:table-cell">
                  Description
                </th>
              </tr>
            </thead>

            <tbody>
              {doc.errors.map((error: any) => (
                <tr key={error.code} className="border-t">
                  <td className="px-6 py-5 font-medium">{error.status}</td>

                  <td className="px-6 py-5 font-mono text-xs">{error.code}</td>

                  <td className="text-muted-foreground hidden px-6 py-5 md:table-cell">
                    {error.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {/* Dataset */}
      <section id="dataset" className="space-y-8">
        <DatasetMetadata metadata={doc.metadata} />
      </section>

      {/* Bottom Navigation */}
      <section className="border-t pt-16">
        <DocsPagination />
      </section>
    </article>
  );
}
