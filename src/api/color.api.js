import HTTP_SERVICE from "../utils/configs/axios.config";

export const getAllColorApi = async () => {
  return HTTP_SERVICE.get("/color/get-all");
};