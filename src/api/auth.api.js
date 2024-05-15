import HTTP_SERVICE from "../utils/configs/axios.config";

export const loginApi = (body) => {
  return HTTP_SERVICE.post("/auth/login", body);
}

export const registerApi = (body) => {
  return HTTP_SERVICE.post("/auth/register", body);
}

export const logoutApi = (params) => {
  return HTTP_SERVICE.post(`/auth/logout?refreshToken=${params}`);
};