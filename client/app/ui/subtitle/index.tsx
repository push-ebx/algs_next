import { ReactNode } from "react";
import styles from './styles.module.scss'

type Props = {
  children: ReactNode,
  className?: string,
}

export const Subtitle = (props: Props) => {
  return (
    <h2 className={`${styles.subtitle} ${props.className}`}>
      {props.children}
    </h2>
  );
};