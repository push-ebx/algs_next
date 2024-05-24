import axios from 'axios';

export const API_URL = `https://server.schedule-scribe.ru/api`

export const $api = axios.create({
  baseURL: API_URL
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});