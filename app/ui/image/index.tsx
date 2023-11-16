import { ReactNode } from "react";
import styles from './styles.module.scss'

// type Props = {
//   className?: string
// }

export const Image = (props: any) => {
  console.log(props)
  return (
    <img src={props.src} alt=""/>
  );
};