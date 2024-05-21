import HTTP_SERVICE from "../utils/configs/axios.config";

export const addToCartApi = (data) => {
  return HTTP_SERVICE.post("/cart/add-to-cart", data);
};

export const getCartItemApi = (userId) => {
  return HTTP_SERVICE.get(`/cart/get-cart-by-user-id/${userId}`);
};

export const removeCartItemApi = (data) => {
  return HTTP_SERVICE.post(`/cart/remove-from-cart`, data);
};

export const getCountCartApi = (userId) => {
  return HTTP_SERVICE.get(`/cart/count-cart/${userId}`);
};

export const clearCartApi = (userId) => {
  return HTTP_SERVICE.delete(`/cart/clear-cart/${userId}`);
};
