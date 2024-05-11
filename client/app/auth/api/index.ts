import {$api} from "@/app/api/config";

export interface User {
  id: number | null;
  username: string;
  token: string;
  role: "admin" | "moderator" | "user" | "";
}

export interface ResponseUser {
  success: boolean;
  message?: string;
  data?: User;
}

export const login = async ({username, password}: { username: string, password: string }) => {
  const res = await $api.post<ResponseUser>(`/auth/login`, {username, password});

  if (res.data.success) {
    localStorage.setItem("token", res.data.data?.token || "");
  }

  return res.data;
};

export const registration = async ({username, password, url}: { username: string, password: string, url?: string }) => {
  const res = await $api.post(`/auth/registration`, {username, password, url});
  return res.data;
};

export const getUser = async () => {
  const res = await $api.get<ResponseUser>(`/user/get`);
  return res.data;
};