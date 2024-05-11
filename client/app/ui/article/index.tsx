"use client"

import React, {useEffect, useState} from 'react';
import styles from "./article.module.scss";
import {getArticleById, getRandomArticle} from "@/app/article/api";
import {Article} from "@/app/lib/types";
import {CustomMarkdown} from "@/app/ui";

export const ArticleComponent = ({isRandom, article_id}: {isRandom?: boolean, article_id?: number}) => {
  const [article, setArticle] = useState<Article>();

  const fetchArticle = async () => {
    if (isRandom) {
      const res = await getRandomArticle();
      setArticle(res.data);
      return
    }
    if (article_id) {
      const res = await getArticleById({article_id});
      setArticle(res.data);
    }
  }

  useEffect(() => {
    fetchArticle();
  }, [article_id]);

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
          <span className={styles.author}>Автор: {article.author?.username}</span>
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