import styles from "./page.module.scss";
import clsx from "clsx";
import {Tree, TreeType} from "@/app/ui";
import Image from "next/image";
import collapseButton from "@/public/icons/collapse-button.svg";
import {fetchTreeArticles} from "@/app/article/api/data";
import {LayoutTree} from "@/app/ui/layout-tree";

const Content = async () => {
  const tree: TreeType = await fetchTreeArticles();

  return (
    <LayoutTree>
      Сайт
    </LayoutTree>
  )
}

export default Content;