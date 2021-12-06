import Axios from "axios";
import { getUser } from "../Helpers/auth";


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
    request.baseURL = process.env.REACT_APP_BASE_URL;

    const user = getUser();

    request.headers = {
        Authorization: user? `${user.token_type} ${user.access_token}` :'Client-ID 3yPcxQbHhIxobeWxe799ZVHjNfafXazpsJdpCIa38pU'

    }
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);


export default Axios;
