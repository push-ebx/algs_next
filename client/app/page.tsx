import styles from "@/app/article/(article)/article.module.scss";
import {ArticleTree} from "@/app/ui/article-tree";
import {ArticleComponent} from "@/app/ui/article";
import React from "react";

const Content = async () => {
  return (
    <main className={styles.main}>
      <ArticleTree/>
      <ArticleComponent isRandom />
    </main>
  )
}

export default Content;