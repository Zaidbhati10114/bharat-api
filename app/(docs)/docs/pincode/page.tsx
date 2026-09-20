import { DocsLayout } from "@/components/docs/docs-layout";
import { DocsPage } from "@/components/docs/docs-page";
import { pincodeDoc } from "@/lib/docs/pincode";

export default function Page() {
  return (
    <DocsLayout>
      <DocsPage doc={pincodeDoc} />
    </DocsLayout>
  );
}
