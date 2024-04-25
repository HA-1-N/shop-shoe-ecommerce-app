export const setupAxiosInterceptors = (
  authContext,
  increaseFetch,
  decreaseFetch,
  axiosCustom
) => {
  const onRequestSuccess = (config) => {
    if (!config.ignoreSpinner) {
      increaseFetch();
    }
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`;
    }
    return config;
  };
  const onResponseSuccess = (response) => {
    const { config } = response;
    if (!(config && config.ignoreSpinner)) {
      decreaseFetch();
    }
    return response;
  };

  const onResponseError = (err) => {
    const { config } = err;
    if (!(config && config.ignoreSpinner)) {
      decreaseFetch();
    }
    const status = err.status || (err.response ? err.response.status : 0);
    if (status === 403 || status === 401) {
      onUnauthenticated();
    }
    return Promise.reject(err);
  };

  axiosCustom.interceptors.request.use(onRequestSuccess);
  axiosCustom.interceptors.response.use(onResponseSuccess, onResponseError);
};
