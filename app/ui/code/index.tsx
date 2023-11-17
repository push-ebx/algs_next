import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight, githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styles from './code.module.scss'

type Props = {
  children?: string,
  className?: string
}

const Code = ({ className, children }: Props) => {
  const language = className?.replace('lang-', '')

  return (
    <div className={styles.code}>
      {
        children &&
        <SyntaxHighlighter language={language} style={atomOneLight}>
          {children}
        </SyntaxHighlighter>
      }
    </div>
  )
}

export {Code};