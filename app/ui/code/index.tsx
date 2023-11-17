import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight, githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type Props = {
  children?: string,
  className?: string
}

const Code = ({ className, children }: Props) => {
  const language = className?.replace('lang-', '')

  return (
    children &&
    <SyntaxHighlighter language={language} style={atomOneLight}>
      {children}
    </SyntaxHighlighter>
  )
}

export {Code};