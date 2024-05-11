"use client"

import {$api} from "@/app/api/config";
import {ResponseArticle, ResponseTree} from "@/app/lib/types";

export const getArticleById = async ({article_id}: {article_id: number}): Promise<ResponseArticle> => {
  const res = await $api.get<ResponseArticle>(`/article/get?article_id=${article_id}`);
  return res.data;
};

export const getTree = async (): Promise<ResponseTree> => {
  const res = await $api.get<ResponseTree>(`/articles/get-tree`);
  return res.data;
};