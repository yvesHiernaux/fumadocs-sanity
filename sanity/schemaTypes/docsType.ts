import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { PlayIcon } from "@sanity/icons";

export const card = defineType({
  name: "card",
  type: "object",
  title: "Card",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "children",
      title: "Children",
      type: "blockContent",
    }),
    defineField({
      name: "url",
      type: "string",
      title: "card href",
    }),
  ],
});

export const blockContent = defineType({
  title: "Content",
  name: "blockContent",
  type: "array",
  of: [
    { type: "block" },
    {
      type: "code",
    },
    { type: "image" },
    {
      type: "card",
    },
  ],
});

export const docsType = defineType({
  name: "docs",
  title: "Documentation",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
    defineField({
      name: "body",
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
