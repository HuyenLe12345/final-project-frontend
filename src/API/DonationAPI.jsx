import axiosClient from "./axiosClient";

const DonationAPI = {
  submitDonationInfo: (projectId, body) => {
    const url = `/projects/${projectId}/donate`;
    return axiosClient.post(url, body);
  },

  getDonationList: (query) => {
    const url = `/admin/get/all-donation/${query}`;
    return axiosClient.get(url);
  },
  updateDonation: (body) => {
    const url = `/admin/donations`;
    return axiosClient.put(url, body);
  },
  searchStatus: (query) => {
    const url = `/admin/donation${query}`;
    return axiosClient.post(url);
  },
  deleteDonationInfo: (id) => {
    const url = `/projects/donations/${id}`;
    return axiosClient.delete(url);
  },
};

export default DonationAPI;
