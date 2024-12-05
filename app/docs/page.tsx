import { Card, Cards } from "fumadocs-ui/components/card";
import { DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/page";
import { DOCS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";

export default async function Page() {
  const pages = await sanityFetch({ query: DOCS_QUERY });

  return (
    <DocsPage>
      <DocsTitle>Pages</DocsTitle>
      <DocsDescription>View the latest pages</DocsDescription>
      <Cards>
        {pages.data.map((page) =>
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
