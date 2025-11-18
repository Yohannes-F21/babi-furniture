// lib/api.ts
import axios from "axios";

const API_BASE = "http://localhost:4000/api";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// === Types ===
interface QueueItem {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

// We'll inject these later
let getAuthState: () => any = () => ({ token: null });
let dispatchRefresh: () => Promise<string> = async () => {
  throw new Error("Not ready");
};
let dispatchLogout: () => void = () => {};

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    error ? prom.reject(error) : prom.resolve(token!);
  });
  failedQueue = [];
};

// === Request Interceptor ===
api.interceptors.request.use((config) => {
  const token = getAuthState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// === Response Interceptor ===
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;

    if (error.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalConfig.headers.Authorization = `Bearer ${token}`;
            return api(originalConfig);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const newToken = await dispatchRefresh();
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        processQueue(null, newToken);
        originalConfig.headers.Authorization = `Bearer ${newToken}`;
        return api(originalConfig);
      } catch (refreshError) {
        processQueue(refreshError, null);
        dispatchLogout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// === Export with init function ===
export const initApi = (
  getState: () => any,
  refreshFn: () => Promise<string>,
  logoutFn: () => void
) => {
  getAuthState = getState;
  dispatchRefresh = refreshFn;
  dispatchLogout = logoutFn;
};

export default api;
