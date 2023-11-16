"use client"

import { useEffect, useRef } from "react";
import 'katex/dist/katex.min.css';
import katex from 'katex';

type Props = {
  expr?: string
}

const KaTeXComponent = ({texExpression}: {texExpression?: string}) => {
  const containerRef = useRef();

  useEffect(() => {
    texExpression &&
    typeof(texExpression) === 'string' &&
    containerRef.current &&
    katex.render(texExpression, containerRef.current, {throwOnError: false});
  }, [texExpression]);

  // @ts-ignore
  return <div ref={containerRef} />
}

export const Katex = ({expr}: Props) => {
  return (
    <KaTeXComponent texExpression={expr}/>
  );
};