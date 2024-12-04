"use client";
import { PortableTextBlock } from "sanity";
import { PortableText } from "@portabletext/react";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { Code } from "@/components/code";
import { urlFor } from "@/sanity/lib/image";
import { getImageDimensions } from "@sanity/asset-utils";

function Image({ value, isInline }: { value: any; isInline: boolean }) {
  const dimensions = getImageDimensions(value);

  return (
    <img
      src={urlFor(value)
        .width(isInline ? 100 : 800)
        .fit("max")
        .auto("format")
        .url()}
      alt={value.alt || " "}
      style={{
        // Display alongside text if image appears inside a block text span
        display: isInline ? "inline-block" : "block",

        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: dimensions.aspectRatio,
      }}
    />
  );
}

export function Renderer({
  body,
}: {
  body: PortableTextBlock | PortableTextBlock[];
}) {
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
        types: {
          image: Image,
          code: (props) => (
            <Code lang={props.value.language} code={props.value.code} />
          ),
        },
      }}
    />
  );
}
