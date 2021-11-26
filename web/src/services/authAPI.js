import axiosClient from "./axiosClient";

const authAPI = {
  register(data) {
    const url = "api/auth/register";
    return axiosClient.post(url, data); // Dùng post gửi lên url và data
  },
  login(data) {
    const url = "api/auth/login";
    return axiosClient.post(url, data); // Dùng post gửi lên url và data
  },
};

export default authAPI;
