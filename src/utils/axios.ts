import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";

export const BASE_URL_BACKEND =
  import.meta.env.VITE_BACKEND_END_POINT ?? "http://localhost:3002";

export interface ConfigAxiosRequest extends AxiosRequestConfig {
  _retry?: boolean;
  skipAuthRefresh?: boolean;
}

axios.defaults.withCredentials = true;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL_BACKEND,
  withCredentials: true,
});

let isRefreshing = false;

let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as ConfigAxiosRequest;

    if (originalRequest?.skipAuthRefresh) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => resolve(axiosInstance(originalRequest)),
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axios.get("/api/auth/__refresh", {
          baseURL: BASE_URL_BACKEND,
          withCredentials: true,
        });

        processQueue();

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
