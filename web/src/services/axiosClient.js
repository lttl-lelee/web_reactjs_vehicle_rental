import axios from "axios";
import queryString from 'query-string';
import Cookie from 'universal-cookie';
export const getToken = () => {
  const cookie = new Cookie();
  const token = cookie.get('token');
  console.log(token);
  if (!token) {
      return null;
  }
  return token.accessToken;
}

// chỗ này chưa get dc token, Ngày mai tìm cách lấy dc token ra, rồi để ở Authorization: `Bearer ${getToken}` ở header
const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Authorization: `Bearer 4|gN3gw88fRFPDnkkbrEVMwJhPv8Yj8xk9BvJuieQX`
  },
  paramsSerializer: params => queryString.stringify(params),
});
// Interceptor
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log("Lỗi lấy từ Axios: ", error.response);
    const { config, status, data } = error.response;
    if (config.url === "api/auth/login" && status === 400) {
      const errorMessage = data.error || {};
      throw new Error(errorMessage);
    }
    if (config.url === "api/auth/login" && status === 419) {
      const errorMessage = data.error || {};
      
      throw new Error(errorMessage);
    }
    if (config.url === "api/auth/register" && status === 403) {
      const listData = data.error || {};
      const listError = listData.email || {};
      const errorMessage = listError.length > 0 ? listError[0] : [];
      throw new Error(errorMessage);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
