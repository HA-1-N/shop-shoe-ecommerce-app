import HTTP_SERVICE from "../utils/configs/axios.config";

export const loginApi = (body) => {
  return HTTP_SERVICE.post("/auth/login", body);
}

export const registerApi = async (data) => {
  return HTTP_SERVICE.post('/auth/register', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      type: 'formData',
    },
  });
};

export const logoutApi = (params) => {
  return HTTP_SERVICE.post(`/auth/logout?refreshToken=${params}`);
};

export const changePasswordApi = (body) => {
  return HTTP_SERVICE.post("/auth/change-password", body);
};