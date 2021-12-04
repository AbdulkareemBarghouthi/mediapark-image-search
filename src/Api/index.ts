import Axios, { AxiosRequestConfig } from "axios";

const baseUrl: string = "https://api.unsplash.com/";

Axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

Axios.interceptors.request.use(
  function (request) {
    request.baseURL = baseUrl;

    request.headers = {
        Authorization:'Client-ID 3yPcxQbHhIxobeWxe799ZVHjNfafXazpsJdpCIa38pU'
    }
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);


export default Axios;
