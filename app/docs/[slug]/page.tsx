import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { DOCS_PAGE_QUERY } from "@/sanity/lib/queries";
import { DOCS_PAGE_QUERYResult } from "@/sanity/types";
import { PortableTextBlock } from "sanity";
import { Renderer } from "@/app/docs/[slug]/renderer";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = await client.fetch<DOCS_PAGE_QUERYResult>(DOCS_PAGE_QUERY, {
    slug: params.slug,
  });
  if (!page) notFound();

  return (
    <DocsPage>
      <DocsTitle>{page.title}</DocsTitle>
      <DocsDescription>{page.description}</DocsDescription>
      <DocsBody>
        <Renderer body={page.body as PortableTextBlock[]} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = await client.fetch<DOCS_PAGE_QUERYResult>(DOCS_PAGE_QUERY, {
    slug: params.slug,
  });
  if (!page) notFound();

  return {
    title: page.title,
    description: page.description,
  };
}
