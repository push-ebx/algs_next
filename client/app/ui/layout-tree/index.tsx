import React from 'react';
import styles from "./styles.module.scss";
import {Tree, TreeType} from "@/app/ui";
import Image from "next/image";
import clsx from "clsx";
import collapseButton from "@/public/icons/collapse-button.svg";
import {fetchTreeArticles} from "@/app/article/api/data";

export const LayoutTree = async ({ children }: {children: React.ReactNode}) => {
  const tree: TreeType = await fetchTreeArticles();

  return (
    <>
      <div className={styles.main}>
        <div className={styles.wrapper_tree}>
          <h2 style={{marginBottom: 20}}>{tree.title}</h2>
          <Tree className={styles.tree} tree={tree}/>
        </div>
        <div>{children}</div>
      </div>
      <Image
        className={clsx(styles.collapseButton)}
        src={collapseButton}
        alt="collapseButton"
      />
    </>
  );
};