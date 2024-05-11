import React from 'react';
import styles from "./styles.module.scss";
import {Tree, TreeType} from "@/app/ui";
import Image from "next/image";
import clsx from "clsx";
import collapseButton from "@/public/icons/collapse-button.svg";
import {getTree} from "@/app/article/api";
import {ArticleTree} from "@/app/ui/article-tree";

export const LayoutTree = async ({ children }: {children: React.ReactNode}) => {
  return (
    <>
      <div className={styles.main}>
        <ArticleTree/>
        <div>{children}</div>
      </div>
      {/*<Image*/}
      {/*  className={clsx(styles.collapseButton)}*/}
      {/*  src={collapseButton}*/}
      {/*  alt="collapseButton"*/}
      {/*/>*/}
    </>
  );
};