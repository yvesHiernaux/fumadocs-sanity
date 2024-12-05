"use client";
import { PortableTextBlock } from "sanity";
import {
  PortableText,
  PortableTextComponentProps,
  PortableTextReactComponents,
} from "@portabletext/react";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { Heading } from "fumadocs-ui/components/heading";

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

const headingLevels = new Array(5).fill(0).map((_, i) => i + 1);
const headingBlocks = Object.fromEntries(
  headingLevels.map((h) => {
    return [
      `h${h}`,
      (props: PortableTextComponentProps<PortableTextBlock>) => {
        console.log(props);
        const { value, children } = props;
        const { _key } = value;

        return (
          <Heading id={_key} as={`h${h}` as "h1"}>
            {children}
          </Heading>
        );
      },
    ];
  }),
);

const components: Partial<PortableTextReactComponents> = {
  block: headingBlocks as PortableTextReactComponents["block"],
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
};

export function Renderer({
  body,
}: {
  body: PortableTextBlock | PortableTextBlock[];
}) {
  return <PortableText value={body} components={components} />;
}
