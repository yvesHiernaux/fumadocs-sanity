import { defineType, type SchemaTypeDefinition } from "sanity";
import { docsType } from "./docsType";

const blockContent = defineType({
  title: "Content",
  name: "blockContent",
  type: "array",
  of: [{ type: "block" }],
});

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContent, docsType],
};
