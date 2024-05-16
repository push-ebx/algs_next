"use client"

import { CSSProperties } from 'react';
import styles from './markdown.module.scss'
import MDEditor from '@uiw/react-md-editor';

type Props = {
  className?: string,
  style?: CSSProperties,
  value?: string,
  setValue? : (value?: string) => void
}

export const CustomMDEditor = (props: Props) => {
  return (
    <MDEditor
      className={`${styles['md-editor']} ${props.className}`}
      value={props.value}
      visibleDragbar={false}
      onChange={props.setValue}
      preview='edit'
      style={props.style}
    />
  );
};