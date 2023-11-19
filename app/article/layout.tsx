import {Tree, TreeType} from "@/app/ui";
import styles from "./layout.module.scss"
import collapseButton from "@/public/icons/collapse-button.svg";
import Image from "next/image";
import clsx from "clsx";
import {fetchTreeArticles} from "@/app/article/api/data";

export default async function Layout({ children }: {children: React.ReactNode}) {
  const tree: TreeType = await fetchTreeArticles();

  return (
    <>
      <div className={styles.main}>
        <div className={styles.wrapper_tree}>
          <h2 style={{marginBottom: 20}}>{tree.title}</h2>
          <Tree className={styles.tree} tree={tree}/>
        </div>
        <div>{children}</div>
      </div>
      <Image
        className={clsx(styles.collapseButton)}
        src={collapseButton}
        alt="collapseButton"
      />
    </>
  )
}