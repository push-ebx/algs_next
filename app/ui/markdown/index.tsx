// "use client";

import styles from './markdown.module.scss';
import Markdown from "markdown-to-jsx";
import { CSSProperties } from "react";
import {Paragraph, Subtitle, Title, Li, RF, Image, Katex} from "@/app/ui";

type Props = {
  children?: string,
  style?: CSSProperties,
  className?: string
}

export const CustomMarkdown = (props: Props) => {
  return (
    <div className={`${styles['md-viewer']} ${props.className}`} >
      <Markdown
        options={{
          overrides: {
            h1: { component: Title },
            h2: { component: Subtitle },
            p: { component: Paragraph },
            li: { component: Li },
            RF: { component: RF },
            katex: { component: Katex }
            // img: { component: Image },
          }
        }}
        style={props.style}
      >
        {props.children ?? ''}
      </Markdown>
    </div>
  )
}