import { ReactNode } from "react";
import styles from './styles.module.scss'

type Props = {
  children: ReactNode,
  className?: string,
}

export const Li = (props: Props) => {
  return (
    <li className={`${styles.li} ${props.className}`}>
      {props.children}
    </li>
  );
};