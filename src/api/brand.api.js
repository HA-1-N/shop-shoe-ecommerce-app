import HTTP_SERVICE from "../utils/configs/axios.config";

export const getAllBrandApi = () => {
  return HTTP_SERVICE.get("/brand/get-all");
};
  