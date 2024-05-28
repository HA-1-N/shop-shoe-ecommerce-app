import HTTP_SERVICE from "../utils/configs/axios.config";

export const getAllCategoryApi = async () => {
  return HTTP_SERVICE.get("/category/get-all");
};
