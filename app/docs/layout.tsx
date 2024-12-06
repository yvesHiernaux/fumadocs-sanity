import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import React, { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { DOCS_QUERY } from "@/sanity/lib/queries";
import { DOCS_QUERYResult } from "@/sanity/types";
import { PageTree } from "fumadocs-core/server";
import { sanityFetch } from "@/sanity/lib/live";
import { Live } from "@/components/live";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Live />
      <Content>{children}</Content>
    </>
  );
}

async function Content({ children }: { children: ReactNode }) {
  const docs = (await sanityFetch({ query: DOCS_QUERY }))
    .data as DOCS_QUERYResult;
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
