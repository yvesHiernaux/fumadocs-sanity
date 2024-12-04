import { Card, Cards } from "fumadocs-ui/components/card";
import { DocsPage, DocsTitle } from "fumadocs-ui/page";
import { client } from "@/sanity/lib/client";
import { DOCS_QUERY } from "@/sanity/lib/queries";
import { DOCS_QUERYResult } from "@/sanity/types";

export default async function Page() {
  const pages = await client.fetch<DOCS_QUERYResult>(DOCS_QUERY);

  return (
    <DocsPage>
      <DocsTitle>Index</DocsTitle>
      <Cards>
        {pages.map((page) =>
          page.slug ? (
            <Card
              key={page.slug.current}
              title={page.title ?? ""}
              href={`/docs/${page.slug.current}`}
            />
          ) : null,
        )}
      </Cards>
    </DocsPage>
  );
}
