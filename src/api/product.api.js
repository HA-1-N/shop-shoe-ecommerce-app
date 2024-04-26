import HTTP_SERVICE from "../utils/configs/axios.config";

export const filterProductApi = (body, params) => {
  return HTTP_SERVICE.post("/product/filter", body, { params });
};
