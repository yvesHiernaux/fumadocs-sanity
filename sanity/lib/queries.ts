import { defineQuery } from "next-sanity";

export const DOCS_QUERY = defineQuery(`*[_type == "docs"]{
  _id, title, slug
}`);

export const DOCS_PAGE_QUERY = defineQuery(
  `*[_type == "docs" && slug.current == $slug][0]{
  ...,
  "toc": body[style in ["h1", "h2", "h3", "h4", "h5", "h6"]]
}`,
);

export const DOCS_SEARCH_QUERY = defineQuery(
  `*[_type == "docs" && title match '*' + $queryString + '*'] { _id, title, slug, description }`,
);
