import { DocsSidebar } from "./docs-sidebar";
import { TableOfContents } from "./table-of-contents";
import { ApiDoc } from "@/lib/docs/types";

interface DocsLayoutProps {
  doc: ApiDoc;
  children: React.ReactNode;
}

export function DocsLayout({ doc, children }: DocsLayoutProps) {
  return (
    <div className="pt-10 pb-24">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="grid gap-14 lg:grid-cols-[220px_minmax(0,760px)_220px]">
          {/* Left Sidebar */}
          <aside className="hidden lg:block">
            <div className="border-border sticky top-24 border-r pr-6">
              <DocsSidebar
                title={doc.title.toUpperCase()}
                sections={doc.sections}
              />
            </div>
          </aside>

          {/* Main */}
          <main className="min-w-0">
            <article className="typeset docs-content">{children}</article>
          </main>

          {/* Right TOC */}
          <aside className="hidden xl:block">
            <div className="sticky top-24">
              <TableOfContents sections={doc.sections} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
