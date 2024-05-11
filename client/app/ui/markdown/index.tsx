import styles from './markdown.module.scss';
import Markdown from "markdown-to-jsx";
import { CSSProperties } from "react";
import {Paragraph, Subtitle, Title, Li, RF, Katex, Code} from "@/app/ui";

type Props = {
  children?: string,
  className?: string,
  style?: CSSProperties
}

export const CustomMarkdown = ({children, className, style}: Props) => {
  return (
    <div className={`${styles['md-viewer']} ${className}`} >
      <Markdown
        options={{
          overrides: {
            h1: { component: Title },
            h2: { component: Subtitle },
            p: { component: Paragraph },
            li: { component: Li },
            RF: { component: RF },
            katex: { component: Katex },
            code: { component: Code }
          }
        }}
        style={style}
      >
        {children ?? ''}
      </Markdown>
    </div>
  )
}