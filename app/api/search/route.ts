import { NextRequest, NextResponse } from "next/server";
import { DOCS_SEARCH_QUERY } from "@/sanity/lib/queries";
import { SortedResult } from "fumadocs-core/server";
import { sanityFetch } from "@/sanity/lib/live";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query") ?? "";
  const results = await sanityFetch({
    query: DOCS_SEARCH_QUERY,
    params: {
      queryString: query,
    },
  });

  return NextResponse.json(
    results.data.map(
      (result) =>
        ({
          type: "page",
          id: result._id,
          url: `/docs/${result.slug?.current}`,
          content: result.title ?? "",
        }) satisfies SortedResult,
    ),
  );
}
