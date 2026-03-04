import API from "./api.service.js";

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
