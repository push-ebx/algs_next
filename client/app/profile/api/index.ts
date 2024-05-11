'use client'

import {$api} from "@/app/api/config";
import {Article, ResponseArticles} from "@/app/lib/types";

export const getArticles = async (): Promise<Article[] | undefined> => {
  const res = await $api.get<ResponseArticles>(`/articles/get`);
  return res.data.data;
};