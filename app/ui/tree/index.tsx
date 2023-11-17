"use client"
import styles from './tree.module.scss'
import React, {CSSProperties, useEffect, useRef, useState} from "react";
import clsx from 'clsx'
import Link from 'next/link';
import * as Icons from './icons'
import useMeasure from 'react-use-measure'
import { useSpring, a } from '@react-spring/web'
import { Title, Frame, Content, toggle } from './styles'

export type TreeType = {
  title?: string,
  id?: number,
  child?: TreeType[]
}

type Props = {
  tree: TreeType,
  className?: string
}

function usePrevious<T>(value: T) {
  const ref = useRef<T>()
  useEffect(() => void (ref.current = value), [value])
  return ref.current
}

const Item = React.memo<
  React.HTMLAttributes<HTMLDivElement> & {
  defaultOpen?: boolean
  name?: string | JSX.Element
}
>(({ children, name, defaultOpen = false }) => {
  const [isOpen, setOpen] = useState(defaultOpen)
  const previous = usePrevious(isOpen)
  const [ref, { height: viewHeight }] = useMeasure()
  const { height, opacity, y } = useSpring({
    from: { height: 0, opacity: 0, y: 0 },
    to: {
      height: isOpen ? viewHeight : 0,
      opacity: isOpen ? 1 : 0,
      y: isOpen ? 0 : 20,
    },
  })

  const Icon: React.FC<{style?: CSSProperties, onClick?: () => any}> = Icons[`${children ? (isOpen ? 'Minus' : 'Plus') : 'Close'}SquareO`]

  return (
    <Frame>
      <Icon style={{ ...toggle, opacity: children ? 1 : 0.5 }} onClick={() => setOpen(!isOpen)} />
      <Title className={styles.title} onClick={() => setOpen(!isOpen)}>{name}</Title>
      <Content
        style={{
          opacity,
          height: isOpen && previous === isOpen ? 'auto' : height,
        }}>
        <a.div ref={ref} style={{ y }} children={children} />
      </Content>
    </Frame>
  )
})

const Tree = ({tree, className}: Props) => { // add active category and sub and article
  return (
    <div className={clsx(styles.tree, className)}>
      {tree.child?.length && tree.child.map((category: TreeType, i) => (
        <Item defaultOpen name={category.title} key={i}>
          {category.child?.length && category.child.map((subcategory: TreeType, j) => (
            <Item defaultOpen name={subcategory.title} key={`${i}.${j}`}>
              {subcategory.child?.length && subcategory.child.map((article: TreeType, k) => (
                <Item
                  key={`${i}.${j}.${k}`}
                  name={<Link href={`?id=${article.id}`}>{article.title}</Link>}
                />
              ))}
            </Item>
          ))}
        </Item>
      ))}
    </div>
  );
};

export {Tree};