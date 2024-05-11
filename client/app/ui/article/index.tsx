"use client"

import React, {useEffect, useState} from 'react';
import styles from "./article.module.scss";
import {getArticleById, getRandomArticle} from "@/app/article/api";
import {Article} from "@/app/lib/types";
import {CustomMarkdown} from "@/app/ui";
import {Loader} from "@/app/ui/loader";
import {Flex, Skeleton} from "antd";

export const ArticleComponent = ({isRandom, article_id}: {isRandom?: boolean, article_id?: number}) => {
  const [article, setArticle] = useState<Article>();
  const [isFetching, setIsFetching] = useState(true);

  const fetchArticle = async () => {
    if (isRandom) {
      const res = await getRandomArticle();
      setArticle(res.data);
      setIsFetching(false);
      return
    }
    if (article_id) {
      const res = await getArticleById({article_id});
      setArticle(res.data);
      setIsFetching(false);
    }
  }

  useEffect(() => {
    fetchArticle();
  }, [article_id]);

  return (
    <div className={styles.article}>
      {
        isFetching ?
          <div className={styles.container} style={{ marginTop: "3.1rem" }}>
            <div className={styles.markdown}>
              <Flex gap={10} vertical>
                {Array(5).fill(<Skeleton active/>)}
              </Flex>
            </div>
          </div> :
          <>
            {
              article &&
              <div className={styles.category_path_author}>
                <span className={styles.category_path}>{article.category} / {article.subcategory}</span>
                <span className={styles.author}>Автор: {article.author?.username}</span>
              </div>
            }
            <div className={styles.container}>
              <CustomMarkdown className={styles.markdown}>
                {
                  article ?
                    article.content :
                    '# Статья не найдена!'
                }
              </CustomMarkdown>
            </div>
          </>
      }
    </div>
  );
};