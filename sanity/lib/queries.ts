import { defineQuery } from "next-sanity";

export const DOCS_QUERY = defineQuery(`*[_type == "docs"]{
  _id, title, slug
}`);

export const DOCS_PAGE_QUERY = defineQuery(
  `*[_type == "docs" && slug.current == $slug][0]`,
);
