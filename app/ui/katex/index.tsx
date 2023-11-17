"use client"

import { useEffect, useRef } from "react";
import 'katex/dist/katex.min.css';
import katex from 'katex';

type Props = {
  expr?: string,
  line?: boolean
}

export const Katex = ({expr, line}: Props) => {
  const containerRef = useRef();

  useEffect(() => {
    expr &&
    typeof(expr) === 'string' &&
    containerRef.current &&
    katex.render(expr, containerRef.current, {throwOnError: false});
  }, [expr]);

  // @ts-ignore
  return <div ref={containerRef} style={{display: line ? "inline" : "block"}}/>
};