import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { DOCS_PAGE_QUERY, DOCS_QUERY } from "@/sanity/lib/queries";
import { PortableTextBlock } from "sanity";
import { Renderer } from "@/app/docs/[slug]/renderer";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = await sanityFetch({
    query: DOCS_PAGE_QUERY,
    params: {
      slug: params.slug,
    },
  }).then((res) => res.data);
  if (!page) notFound();

  const toc = page.toc?.map((item) => {
    return {
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
    };
  });

  return (
    <DocsPage toc={toc}>
      <DocsTitle>{page.title}</DocsTitle>
      <DocsDescription>{page.description}</DocsDescription>
      <DocsBody>
        <Renderer body={page.body as PortableTextBlock[]} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  const pages = await client.fetch(DOCS_QUERY);

  return pages.map((page) => ({
    slug: page.slug?.current ?? "",
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = await sanityFetch({
    query: DOCS_PAGE_QUERY,
    params: {
      slug: params.slug,
    },
  });
  if (!page.data) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
