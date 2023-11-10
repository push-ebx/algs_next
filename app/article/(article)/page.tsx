import styles from './article.module.scss'
import {CustomMarkdown} from "@/app/ui/markdown";
import {article} from "@/app/lib/placeholder-data";

export default function Article() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <CustomMarkdown>
          {article}
        </CustomMarkdown>
      </div>
    </main>
  )
}