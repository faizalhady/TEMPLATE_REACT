import axios, { AxiosError, type AxiosRequestConfig } from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  timeout: 15000,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // ✅ Properly typed config
    const config = error.config as AxiosRequestConfig & { _retryCount?: number };

    if (!config) return Promise.reject(error); // Safety check

    const maxRetries = 3;
    config._retryCount = config._retryCount ?? 0;

    // Retry logic
    if (
      (error.code === "ECONNABORTED" ||
        (error.response && error.response.status >= 500)) &&
      config._retryCount < maxRetries
    ) {
      const delay = Math.pow(2, config._retryCount) * 1000;
      console.warn(
        `⚠️ Retrying ${config.url} in ${delay / 1000}s (${config._retryCount + 1}/${maxRetries})`
      );
      config._retryCount += 1;
      await new Promise((resolve) => setTimeout(resolve, delay));
      return axiosClient(config);
    }

    // Auth refresh (commented)
    /*
    if (error.response?.status === 401) {
      try {
        const newToken = await refreshAuthToken(); // implement later
        if (newToken) {
          localStorage.setItem("auth_token", newToken);
          config.headers = config.headers ?? {};
          config.headers.Authorization = `Bearer ${newToken}`;
          return axiosClient(config);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
      }
    }
    */

    console.error("❌ API Error:", error.message);
    return Promise.reject(error);
  }
);
