import React from "react";
import styles from "./article.module.scss"
import {ArticleTree} from "@/app/ui/article-tree";
import {ArticleComponent} from "@/app/ui/article";

export default async function Article({ searchParams, }: { searchParams?: { id?: number } }) {
  const article_id = searchParams?.id || 0;

  return (
    <main className={styles.main}>
      <ArticleTree/>
      <ArticleComponent article_id={article_id}/>
    </main>
  )
}