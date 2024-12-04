import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { client } from "@/sanity/lib/client";
import { DOCS_QUERY } from "@/sanity/lib/queries";
import { DOCS_QUERYResult } from "@/sanity/types";
import { PageTree } from "fumadocs-core/server";

export default async function Layout({ children }: { children: ReactNode }) {
  const docs = await client.fetch<DOCS_QUERYResult>(DOCS_QUERY);
  const root: PageTree.Root = {
    name: "Docs",
    children: [],
  };

  for (const page of docs) {
    root.children.push({
      type: "page",
      name: page.title ?? "",
      url: `/docs/${page.slug?.current}`,
    });
  }

  return (
    <DocsLayout tree={root} {...baseOptions}>
      {children}
    </DocsLayout>
  );
}
