"use client";
import { lazy, type LazyExoticComponent } from "react";
import { render } from "@/components/code.shared";

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
