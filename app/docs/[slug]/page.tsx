import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { DOCS_PAGE_QUERY, DOCS_QUERY } from "@/sanity/lib/queries";
import { DOCS_PAGE_QUERYResult, DOCS_QUERYResult } from "@/sanity/types";
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
    <DocsPage
      toc={page.toc?.map((item) => ({
        depth: item.level ?? 0,
        title: (
          <Renderer
            body={{
              ...(item as PortableTextBlock),
              style: undefined,
            }}
          />
        ),
        url: `#${item._key}`,
      }))}
    >
      <DocsTitle>{page.title}</DocsTitle>
      <DocsDescription>{page.description}</DocsDescription>
      <DocsBody>
        <Renderer body={page.body as PortableTextBlock[]} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  const pages = await client.fetch<DOCS_QUERYResult>(DOCS_QUERY);

  return pages.map((page) => ({
    slug: page.slug?.current ?? "",
  }));
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
