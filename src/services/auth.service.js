import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1",
});

// Interceptor para enviar JWT automáticamente
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Registro de usuario
export const registerRequest = async (data) => {
  const response = await API.post("/auth/register", data);
  return response.data;
};

// Login con email
export const loginRequest = async (email, password) => {
  const response = await API.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};

// Login con Google (envía idToken al backend)
export const googleLoginRequest = async (idToken) => {
  const response = await API.post("/auth/google", {
    idToken,
  });
  return response.data;
};
