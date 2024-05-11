import {Tree, TreeType} from "@/app/ui";
import {fetchTreeArticles} from "@/app/article/api/data";
import {LayoutTree} from "@/app/ui/layout-tree";
import {Footer} from "antd/lib/layout/layout";
import {Content as ContentAntd} from "antd/es/layout/layout";

const Content = async () => {
  const tree: TreeType = await fetchTreeArticles();

  return (
    <LayoutTree>
      Сайт
    </LayoutTree>
  )
}

export default Content;