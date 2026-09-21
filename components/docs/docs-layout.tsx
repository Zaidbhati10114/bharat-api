import { ReactNode } from "react";

import { DocsSidebar } from "./docs-sidebar";
import { TableOfContents } from "./table-of-contents";
import { ApiDoc } from "@/lib/docs/types";

interface DocsLayoutProps {
  doc: ApiDoc;
  children: ReactNode;
}

export function DocsLayout({ doc, children }: DocsLayoutProps) {
  return (
    <div className="pt-8 pb-20">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="grid gap-16 lg:grid-cols-[240px_minmax(0,760px)_220px]">
          {/* Left Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 border-r pr-6">
              <DocsSidebar
                title={doc.title.toUpperCase()}
                sections={doc.sections}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="max-w-[820px] min-w-0 pl-4 xl:pl-6">{children}</main>

          {/* Right TOC */}
          <aside className="hidden xl:block">
            <div className="sticky top-28">
              <TableOfContents sections={doc.sections} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
