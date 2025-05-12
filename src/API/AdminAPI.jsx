import axiosClient from "./axiosClient";

const AdminAPI = {
  // getUsers: (query) => {
  //   const url = `/admin/get/user-information${query}`;
  //   console.log(url);
  //   return axiosClient.get(url);
  // },
  getUsersByType: (query) => {
    const url = `/admin/get/user-information${query}`;
    console.log(url);
    return axiosClient.get(url);
  },
  getTotalUsers: () => {
    const url = "/admin/get/user-total";
    return axiosClient.get(url);
  },
  getPartners: (query) => {
    const url = `/admin/get/partner-information${query}`;
    return axiosClient.get(url);
  },
  getTotalPartners: () => {
    const url = "/admin/get/partner-total";
    return axiosClient.get(url);
  },
  getAdmins: (query) => {
    const url = `/admin/get/admin-information${query}`;
    return axiosClient.get(url);
  },
  deleteUser: (id) => {
    const url = `/admin/delete/users/${id}`;
    return axiosClient.delete(url);
  },
  getTotalAdmins: () => {
    const url = "/admin/get/admin-total";
    return axiosClient.get(url);
  },
  getTotalInfo: () => {
    const url = "/admin";
    return axiosClient.get(url);
  },
  createAccountAdmin: (body) => {
    const url = "/admin/create-account/admin";
    return axiosClient.post(url, body);
  },
  createAccountPartner: (body) => {
    const url = "/admin/create-account/partner";
    return axiosClient.post(url, body);
  },
  getTotalStats: () => {
    const url = "/admin/get/total-stats";
    return axiosClient.get(url);
  },
  getBackgrounds: () => {
    const url = "/admin/get/backgrounds";
    return axiosClient.get(url);
  },
  getPartnerLogos: () => {
    const url = "/admin/get/logos";
    return axiosClient.get(url);
  },
  getTenDonations: () => {
    const url = "/admin/get/recentDonations";
    return axiosClient.get(url);
  },
  getDonationByDate: (query) => {
    const url = `/admin/get/donationByDate${query}`;
    return axiosClient.get(url);
  },
};

export default AdminAPI;
