import HTTP_SERVICE from "../utils/configs/axios.config";

export const filterPaymentTypeApi = (data, params) => {
  return HTTP_SERVICE.post("/payment-type/filter", data, { params });
};