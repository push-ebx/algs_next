import {Spin} from "antd";
import styles from "./styles.module.scss";

export const Loader = () => {
  return (
    <div className={styles.loader_container}>
      <Spin size="large"/>
    </div>
  );
};