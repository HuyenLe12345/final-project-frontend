import axiosClient from "./axiosClient";

const UserAPI = {
  postSignUp: (body) => {
    const url = `/users/auth/signup`;
    return axiosClient.post(url, body);
  },
  postSignIn: (body) => {
    const url = `/users/auth/signin`;
    return axiosClient.post(url, body);
  },
  getVerifyEmail: (token) => {
    const url = `/users/auth/verify-email/${token}`;
    return axiosClient.get(url);
  },

  postLogout: (body) => {
    const url = "/users/auth/logout";
    return axiosClient.delete(url, body);
  },

  // lấy profile trong trang PERSONALPAGE
  getProfile: (id) => {
    const url = `/users/personal-info/${id}`;
    return axiosClient.get(url);
  },
  // LẤY THÔNG TIN KHI RELOAD LẠI TRANG NẾU CÒN TOKEN
  getPersonalInfo: (query) => {
    const url = `/users/personal-info${query}`;
    return axiosClient.get(url);
  },
  postUpdatePersonalInfo: (userId, body) => {
    const url = `/users/personal-info/${userId}/update`;
    return axiosClient.post(url, body);
  },
  getStats: (userId) => {
    const url = `/users/${userId}/stats`;
    return axiosClient.get(url);
  },
  getActivities: (userId) => {
    const url = `/users/${userId}/activities`;
    return axiosClient.get(url);
  },
  getDonationActivities: (userId) => {
    const url = `/users/donation-activities/${userId}`;
    return axiosClient.get(url);
  },
  patchImage: (userId, body, query) => {
    const url = `/users/${userId}/upload${query}`;
    return axiosClient.patch(url, body);
  },
  getProjectsById: (userId, query) => {
    const url = `/users/${userId}/projects${query}`;
    return axiosClient.get(url);
  },
  getPostsById: (userId) => {
    const url = `/users/${userId}/posts`;
    return axiosClient.get(url);
  },
  postForgotPassword: (body) => {
    const url = "/users/auth/forgot-password";
    return axiosClient.post(url, body);
  },

  postResetPassword: (token, body) => {
    const url = `/users/auth/reset-password/${token}`;
    return axiosClient.post(url, body);
  },
  getOrganizationList: () => {
    const url = "/users/organizations";
    return axiosClient.get(url);
  },
};

export default UserAPI;
