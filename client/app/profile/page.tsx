"use client"

import {getArticles} from "./api";
import styles from './profile.module.scss'
import Link from "next/link";
import {useEffect, useState} from "react";
import {Article} from "@/app/lib/types";
import {useAuth} from "@/app/lib/hooks/useAuth";
import {Loader} from "@/app/ui/loader";
import {useRouter} from "next/navigation";

export default function Dashboard() {
  const [articles, setArticles] = useState<Article[]>();
  const {user, isFetching: isFetchingUser} = useAuth();
  const router = useRouter();

  useEffect(() => {
    getArticles().then(setArticles);
  }, []);

  useEffect(() => {
    if (!user?.id && !isFetchingUser) {
      router.push(`/auth`, { scroll: false });
    }
  }, [user]);

  return (
    <div className={styles.profile}>
      {
        isFetchingUser && !user?.id ?
          <Loader/> :
          <div className={styles.list}>
            {JSON.stringify(user)}
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
      }
    </div>
  );
}