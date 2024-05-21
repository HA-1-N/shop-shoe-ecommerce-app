import HTTP_SERVICE from "../utils/configs/axios.config";

export const getCurrentUserByIdApi = (id) => {
  return HTTP_SERVICE.get(`/user/get-by-id/${id}`);
};