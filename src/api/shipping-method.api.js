import HTTP_SERVICE from "../utils/configs/axios.config";

export const filterShippingMethod = (data, params) => {
  return HTTP_SERVICE.post("/shipping-method/filter", data, { params });
};