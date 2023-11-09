import { ReactNode } from "react";
import styles from './styles.module.scss'

type Props = {
  children: ReactNode
}

export const Paragraph = ({children}: Props) => {
  return (
    <h1 className={styles.paragraph}>{children}</h1>
  );
};