"use client";
import { lazy, type LazyExoticComponent } from "react";
import type { HighlighterGeneric } from "shiki";
import type { BundledLanguage, BundledTheme } from "shiki/bundle/web";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";

export interface CodeProps {
  lang: string;
  code: string;
}

const codeMap = new Map<
  string,
  LazyExoticComponent<(props: CodeProps) => JSX.Element | null>
>();

export function Code(props: CodeProps) {
  let CodeLazy = codeMap.get(props.lang);

  if (!CodeLazy) {
    CodeLazy = lazy(async () => {
      const { getSingletonHighlighter } = await import("shiki/bundle/web");

      const highlighter = await getSingletonHighlighter({
        langs: [props.lang],
        themes: ["vesper", "one-light"],
      });

      return {
        default(props: CodeProps) {
          return render(highlighter, props.lang, props.code);
        },
      };
    });
  }

  codeMap.set(props.lang, CodeLazy);

  return <CodeLazy {...props} />;
}

type Highlighter = HighlighterGeneric<BundledLanguage, BundledTheme>;

function render(highlighter: Highlighter, lang: string, code: string) {
  if (!code) return null;
  const hast = highlighter.codeToHast(code, {
    lang,
    themes: {
      light: "one-light",
      dark: "vesper",
    },
    defaultColor: false,
    transformers: [
      {
        // add empty space to empty lines, so it has a height in 'display: grid' layout
        line(line) {
          if (line.children.length === 0) {
            line.children.push({
              type: "text",
              value: " ",
            });
          }
        },
      },
    ],
  });

  return toJsxRuntime(hast, {
    Fragment,
    jsx,
    jsxs,
    development: false,
    components: {
      pre: (props) => (
        <CodeBlock keepBackground {...props}>
          <Pre>{props.children}</Pre>
        </CodeBlock>
      ),
    },
  });
}
