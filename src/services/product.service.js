import API from "./api.service.js";

// Obtener todos los productos
export const getAllProductsRequest = async () => {
  const response = await API.get("/products");
  return response.data;
};

// Obtener producto por ID
export const getProductByIdRequest = async (id) => {
  const response = await API.get(`/products/${id}`);
  return response.data;
};

// Crear producto (admin)
export const createProductRequest = async (data) => {
  const response = await API.post("/products", data);
  return response.data;
};

// Actualizar producto (admin)
export const updateProductRequest = async (id, data) => {
  const response = await API.patch(`/products/${id}`, data);
  return response.data;
};

// Eliminar producto (admin)
export const deleteProductRequest = async (id) => {
  const response = await API.delete(`/products/${id}`);
  return response.data;
};
