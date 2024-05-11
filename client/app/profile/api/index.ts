'use client'

import {$api} from "@/app/api/config";
import {Article} from "@/app/lib/types";

export interface ResponseArticles {
  success: boolean;
  message?: string;
  data?: Article[];
}

export const getArticles = async (): Promise<Article[] | undefined> => {
  const res = await $api.get<ResponseArticles>(`/articles/get`);
  return res.data.data;
};