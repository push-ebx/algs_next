import { ReactNode } from "react";
import styles from './styles.module.scss'

type Props = {
  children: ReactNode
}

export const Paragraph = ({children}: Props) => {
  return (
    <p className={styles.paragraph}>{children}</p>
  );
};