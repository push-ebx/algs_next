import styles from './article.module.scss'
import {Article} from "@/app/lib/types";
import {CustomMarkdown} from "@/app/ui/markdown";
import {fetchArticleByID} from "@/app/article/api/data";
import Image from "next/image"

export default async function Article({
    searchParams,
  }: {
  searchParams?: {
      id?: number;
    };
  }) {
  const article_id = searchParams?.id;
  const article: Article | undefined = await fetchArticleByID(article_id);

  return (
    <div className={styles.article}>
      {article?.header_image &&
        <Image
          className={styles.header_image}
          src={article.header_image}
          alt={'header image'}
          fill={true}
        />
      }
      { article &&
        <div className={styles.category_path_author}>
          <span className={styles.category_path}>{article.category} / {article.subcategory}</span>
          <span className={styles.author}>{article.author}</span>
        </div>
      }
      <div className={styles.container}>
        <CustomMarkdown className={styles.markdown}>
          {article ? article.content : '# Статья не найдена!'}
        </CustomMarkdown>
      </div>
    </div>
  )
}