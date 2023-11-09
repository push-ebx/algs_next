import { ReactNode } from "react";
import styles from './styles.module.scss'

type Props = {
  children: ReactNode,
  className?: string,
}

export const Title = (props: Props) => {
  return (
    <div className={`${styles.title} ${props.className}`}>
      {props.children}
    </div>
  );
};