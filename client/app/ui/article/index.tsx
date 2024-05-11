"use client"

import React, {useEffect, useState} from 'react';
import styles from "./article.module.scss";
import {getArticleById} from "@/app/article/api";
import {Article} from "@/app/lib/types";
import {CustomMarkdown} from "@/app/ui";

export const ArticleComponent = ({article_id}: {article_id: number}) => {
  const [article, setArticle] = useState<Article>();

  const fetchArticle = async () => {
    const res = await getArticleById({article_id});
    setArticle(res.data);
  }

  useEffect(() => {
    console.log(article_id)
    fetchArticle();
  }, []);

  return (
    <div className={styles.article}>
      {/*{article?.header_image &&*/}
      {/*  <Image*/}
      {/*    className={styles.header_image}*/}
      {/*    src={article.header_image}*/}
      {/*    alt={'header image'}*/}
      {/*    fill={true}*/}
      {/*  />*/}
      {/*}*/}
      {article &&
        <div className={styles.category_path_author}>
          <span className={styles.category_path}>{article.category} / {article.subcategory}</span>
          <span className={styles.author}>{article.author_id}</span>
        </div>
      }
      <div className={styles.container}>
        <CustomMarkdown className={styles.markdown}>
          {article ? article.content : '# Статья не найдена!'}
        </CustomMarkdown>
      </div>
    </div>
  );
};