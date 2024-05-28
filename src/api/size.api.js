import HTTP_SERVICE from "../utils/configs/axios.config";

export const getAllSizeApi = async () => {
  return HTTP_SERVICE.get("/size/get-all");
};