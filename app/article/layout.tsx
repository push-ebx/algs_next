import {Header} from "@/app/ui/header";
import {Tree, TreeType} from "@/app/ui";
import styles from "./layout.module.scss"
import collapseButton from "@/public/icons/collapse-button.svg";
import Image from "next/image";
import clsx from "clsx";
import {fetchAllArticles} from "@/app/article/api/data";

export default async function Layout({ children }: {children: React.ReactNode}) {
  const tree: TreeType = await fetchAllArticles();

  return (
    <>
      <div className={styles.main}>
          <div className={styles.tree}>
            <h2 style={{marginBottom: 20}}>{tree.title}</h2>
            <Tree tree={tree}/>
          </div>
        <div>{children}</div>
      </div>
      <Image className={clsx("icon", styles.collapseButton)} src={collapseButton} alt="collapseButton"/>
    </>
  )
}