import {$api} from "@/app/api/config";

export interface User {
  id: number | null;
  username: string;
  token: string;
  role: "admin" | "moderator" | "user" | "";
}

export interface Response {
  success: boolean;
  data?: User;
}

export const login = async ({username, password}: { username: string, password: string }) => {
  const res = await $api.post<Response>(`/auth/login`, {username, password});
  console.log(res.data.data)
  // if (res.data.success) {
    // localStorage.setItem("token", res.data.data.token);
  // }

  return res.data;
};

export const registration = async ({username, password, url}: { username: string, password: string, url: string }) => {
  const res = await $api.post(`/auth/registration`, {username, password, url});
  return res.data;
};