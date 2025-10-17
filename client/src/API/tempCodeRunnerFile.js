import axios from "axios";

const api = axios.create({
  baseURL: "http://10.10.10.195:3000", // backend
});

// middleware tambahkan token JWT otomatis
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
