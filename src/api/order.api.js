import HTTP_SERVICE from "../utils/configs/axios.config";

export const orderCheckoutApi = (values) => {
  return HTTP_SERVICE.post("/order/checkout", values);
};

export const getOrderByUserIdApi = (userId) => {
  return HTTP_SERVICE.get(`/order/get-order-by-user-id/${userId}`);
};

export const getOrderByIdApi = (orderId) => {
  return HTTP_SERVICE.get(`/order/get-order-by-id/${orderId}`);
};
