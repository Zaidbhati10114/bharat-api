import { DocsLayout } from "@/components/docs/docs-layout";
import { DocsPage } from "@/components/docs/docs-page";
import { getPincodeDoc } from "@/lib/docs/from-openapi";

export default function Page() {
  const doc = getPincodeDoc();

  return (
    <DocsLayout doc={doc}>
      <DocsPage doc={doc} />
    </DocsLayout>
  );
}
