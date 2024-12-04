"use client";
import { PortableTextBlock } from "sanity";
import { PortableText } from "@portabletext/react";
import defaultMdxComponents from "fumadocs-ui/mdx";

export function Renderer({ body }: { body: PortableTextBlock[] }) {
  return (
    <PortableText
      value={body}
      components={{
        marks: {
          link: (props) => (
            <defaultMdxComponents.a href={props.value.href} key={props.markKey}>
              {props.children}
            </defaultMdxComponents.a>
          ),
        },
      }}
    />
  );
}
