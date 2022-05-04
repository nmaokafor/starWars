import axios from 'axios';
export const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
  function (config) {
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json',
    };

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export const getData = async (url: string) => {
  const { data } = await axiosInstance({
    method: 'GET',
    url,
  });
  return data;
};
