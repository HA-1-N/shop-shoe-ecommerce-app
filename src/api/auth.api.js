import HTTP_SERVICE from "../utils/configs/axios.config";

export const loginApi = (body) => {
  return HTTP_SERVICE.post("/auth/login", body);
}

export const registerApi = async (data) => {
  return HTTP_SERVICE.post('/auth/register', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      // type: 'formData',
    },
  });
};

export const logoutApi = (params) => {
  return HTTP_SERVICE.post(`/auth/logout?refreshToken=${params}`);
};

export const changePasswordApi = (body) => {
  return HTTP_SERVICE.post("/auth/change-password", body);
};

export const verifyEmailApi = async (params) => {
  return await HTTP_SERVICE.get('/auth/verify-email', { params });
};

export const verifyOtpApi = async (data) => {
  return await HTTP_SERVICE.post('/auth/verify-otp-email', data);
};

export const resetPasswordApi = async (body) => {
  return await HTTP_SERVICE.post('/auth/reset-password', body);
};