"use client"

import {fetchListArticles} from "./api";
import styles from './profile.module.scss'
import Link from "next/link";
import {useEffect, useState} from "react";
import {Article} from "@/app/lib/types";

export default function Dashboard() {
  const [articles, setArticles] = useState<Article[]>();

  useEffect(() => {
    fetchListArticles().then(setArticles);
  }, []);

  return (
    <div className={styles.profile}>
      <div className={styles.list}>
        {
          articles &&
          articles.map((article, i) =>
            <div className={styles.item} key={article.id}>
              <span className={styles.number}>{i + 1}.</span>
              <Link className={styles.title} href={`/article?id=${article.id}`}>
                <h4>{article.title}</h4>
              </Link>
              <input
                type="checkbox"
                onClick={e => e.preventDefault()}
                className={styles.delete}
              />
              <input
                type="checkbox"
                onClick={e => e.preventDefault()}
                className={styles.edit}
              />
              <input
                type="checkbox"
                onClick={e => e.preventDefault()}
                className={styles.public}
              />
            </div>
          )
        }
      </div>
    </div>
  );
}