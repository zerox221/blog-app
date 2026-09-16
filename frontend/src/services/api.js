import axios from "axios";
import { Navigate } from "react-router-dom";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    console.log(originalRequest);
    if (
      error.response?.status === 401 &&
      !originalRequest?._retry &&
      originalRequest?.url !== "/api/v1/auth/refresh/token" &&
      !originalRequest?.url.includes("login") &&
      !originalRequest?.url.includes("register")
    ) {
      originalRequest._retry = true;

      try {
        await api.get("/api/v1/auth/refresh/token");
        console.log("REFRESH SUCCESS");
        return api(originalRequest);
      } catch (refreshError) {
        console.log("REFRESH FAILED");

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
