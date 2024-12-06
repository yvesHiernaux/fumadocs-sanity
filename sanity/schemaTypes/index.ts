import { type SchemaTypeDefinition } from "sanity";
import { docsType, card, blockContent } from "./docsType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [card, blockContent, docsType],
};
