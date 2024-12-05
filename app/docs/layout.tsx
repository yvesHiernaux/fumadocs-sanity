import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import React, { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { DOCS_QUERY } from "@/sanity/lib/queries";
import { DOCS_QUERYResult } from "@/sanity/types";
import { PageTree } from "fumadocs-core/server";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/draft-mode";
import { VisualEditing } from "next-sanity";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SanityLive />
      {(await draftMode()).isEnabled && (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      )}
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
