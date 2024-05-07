import axios from "axios";

const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem("accessToken");
  }
  return null
};

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

API.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken();

    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;