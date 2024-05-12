'use client'

import {$api} from "@/app/api/config";
import {Article, GeneralResponse, ResponseArticle, ResponseArticles, ResponseUsers, User} from "@/app/lib/types";

export const getArticles = async (): Promise<Article[] | undefined> => {
  const res = await $api.get<ResponseArticles>(`/articles/get`);
  return res.data.data;
};

export const getUsers = async (): Promise<User[] | undefined> => {
  const res = await $api.get<ResponseUsers>(`/users/get`);
  return res.data.data?.users;
};

export const assignRole = async ({user_id, role}: {user_id: number, role: string}): Promise<GeneralResponse | undefined> => {
  const res = await $api.post<GeneralResponse>(`/users/assign-role`, {user_id, role});
  return res.data;
};

export const setApproveArticle = async ({article_id, is_approved}: {article_id: number, is_approved: boolean}): Promise<GeneralResponse | undefined> => {
  const res = await $api.post<GeneralResponse>(`/article/set-approve-article`, {article_id, is_approved});
  return res.data;
};

export const deleteUser = async ({user_id}: {user_id: number}): Promise<GeneralResponse> => {
  const res = await $api.delete<GeneralResponse>(`/user/delete?user_id=${user_id}`);
  return res.data;
};