import axiosClient from "./axiosClient";

const ProvinceAPI = {
  getProvinces: () => {
    const url = "/users/provinces";
    return axiosClient.get(url);
  },
  postDistricts: (body) => {
    const url = "/users/districts";
    return axiosClient.post(url, body);
  },
  postWards: (body) => {
    const url = "/users/wards";
    return axiosClient.post(url, body);
  },
};
export default ProvinceAPI;
