import {
  Fact,
  FactList,
  Gallery,
  Prose,
  PullQuote,
  Section,
  Shot,
} from "@/app/work/case-studies/[slug]/CaseStudyBlocks";
import { RevealBlock } from "@/app/work/case-studies/[slug]/RevealBlock";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Plain-markdown fallbacks. Case studies are expected to compose the layout
 * components from `CaseStudyBlocks` (Section / Gallery / Shot), but any loose
 * markdown still needs to land in the same editorial type scale.
 */

function HeadingTwo({ children }: ComponentPropsWithoutRef<"h2">) {
  return (
    <RevealBlock>
      <h2 className="mt-24 mb-7 text-[clamp(1.9rem,4.4vw,3.15rem)] font-bold leading-[1.05] tracking-[-.035em] text-white first:mt-0 sm:mt-32">
        {children}
      </h2>
    </RevealBlock>
  );
}

function HeadingThree({ children }: ComponentPropsWithoutRef<"h3">) {
  return (
    <RevealBlock>
      <h3 className="mt-12 mb-4 text-[10px] font-bold uppercase tracking-[.24em] text-purple-300">
        {children}
      </h3>
    </RevealBlock>
  );
}

function Paragraph({ children }: ComponentPropsWithoutRef<"p">) {
  return <Prose>{children}</Prose>;
}

function UnorderedList({ children }: ComponentPropsWithoutRef<"ul">) {
  return <FactList>{children}</FactList>;
}

function ListItem({ children }: ComponentPropsWithoutRef<"li">) {
  return <Fact>{children}</Fact>;
}

function BlockQuote({ children }: ComponentPropsWithoutRef<"blockquote">) {
  return <PullQuote>{children}</PullQuote>;
}

function Anchor({ href, ...props }: ComponentPropsWithoutRef<"a">) {
  return (
    <Link
      {...props}
      href={href ?? "#"}
      className="text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
    />
  );
}

function Strong({ children }: ComponentPropsWithoutRef<"strong">) {
  return <strong className="font-bold text-white">{children}</strong>;
}

function MarkdownImage(props: ComponentPropsWithoutRef<"img">) {
  return (
    <Gallery layout="full">
      <Shot
        src={typeof props.src === "string" ? props.src : ""}
        alt={props.alt}
        ratio="16/9"
      />
    </Gallery>
  );
}

export const caseStudyMDXComponents = {
  h2: HeadingTwo,
  h3: HeadingThree,
  p: Paragraph,
  ul: UnorderedList,
  li: ListItem,
  blockquote: BlockQuote,
  a: Anchor,
  strong: Strong,
  img: MarkdownImage,

  // Layout primitives available to every case study without an import.
  Section,
  Prose,
  Gallery,
  Shot,
  PullQuote,
  FactList,
  Fact,
} satisfies MDXComponents;
