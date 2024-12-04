import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import type { HighlighterGeneric } from "shiki";
import type { BundledLanguage, BundledTheme } from "shiki/bundle/web";

export type Highlighter = HighlighterGeneric<BundledLanguage, BundledTheme>;

export function render(highlighter: Highlighter, lang: string, code: string) {
  const hast = highlighter.codeToHast(code, {
    lang,
    themes: {
      light: "one-light",
      dark: "vesper",
    },
    defaultColor: false,
    transformers: [
      {
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
