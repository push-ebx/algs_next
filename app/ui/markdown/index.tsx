// "use client";

import styles from './markdown.module.scss'
import Markdown from "markdown-to-jsx";
import { CSSProperties } from "react";
import {Paragraph, Subtitle, Title, Li, Header} from "@/app/ui";
// import Image from "next/image";
// import ReactFlow from 'reactflow';
//
// import 'reactflow/dist/style.css';

type Props = {
  children?: string,
  style?: CSSProperties,
  className?: string
}
const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const Test = ({label, height}:{label: string, height: number}) => {
  return (
    <div style={{width: '100%', height: `${height}px`}}>
    {/*<ReactFlow*/}
    {/*  nodes={[*/}
    {/*    { id: '1', position: { x: 0, y: 0 }, data: { label: label } },*/}
    {/*    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },*/}
    {/*  ]}*/}
    {/*  edges={[{ id: 'e1-2', source: '1', target: '2' }]}*/}
    {/*/>*/}
    </div>
  )
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
            // ReactFlow: { component: Test },
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