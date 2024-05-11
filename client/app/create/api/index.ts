import {$api} from "@/app/api/config";
import {ResponseArticle} from "@/app/lib/types";

export const createArticle = async ({title, category, subcategory, content, is_draft}:
                                      {
                                        title: string,
                                        category: string,
                                        subcategory: string,
                                        content: string,
                                        is_draft: boolean
                                      }): Promise<ResponseArticle> => {
  const res = await $api.post<ResponseArticle>(`/article/create`,
    {title, category, subcategory, content, is_draft}
  );
  return res.data;
};