import axios from "axios";

import { useAuthStore } from "../hooks/useAuthStore.js";

const baseURL = import.meta.env.DEV
  ? "/api"
  : import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "/api";

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  const apiKey = import.meta.env.VITE_API_KEY;

  if (apiKey) {
    config.headers["x-api-key"] = apiKey;
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      if (
        typeof window !== "undefined" &&
        !window.location.pathname.startsWith("/login") &&
        !window.location.pathname.startsWith("/register")
      ) {
        window.location.assign("/login");
      }
    }

    return Promise.reject(error);
  },
);
