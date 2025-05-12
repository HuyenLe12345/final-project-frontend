import axiosClient from "./axiosClient";

const ProjectAPI = {
  postProjectForm: (body) => {
    const url = "/admin/project-form";
    return axiosClient.post(url, body);
  },
  getDonationListByProjectId: (projectId, query) => {
    const url = `/projects/${projectId}/donations${query}`;
    return axiosClient.get(url);
  },
  getDonationByName: (projectId, query) => {
    const url = `/projects/${projectId}/donationByName${query}`;
    return axiosClient.get(url);
  },
  getProjectDetail: (projectId) => {
    const url = `/projects/${projectId}`;
    return axiosClient.get(url);
  },
  getProjectDetailFormToEdit: (projectId) => {
    const url = `/projects/edit/${projectId}`;
    return axiosClient.get(url);
  },
  updateProjectDetail: (projectId, body) => {
    const url = `/projects/update/${projectId}`;
    return axiosClient.post(url, body);
  },
  getProjectList: (organizationId) => {
    const url = `/admin/projects/${organizationId}`;
    return axiosClient.get(url);
  },
  getAllProjectList: () => {
    const url = "/projects/all";
    return axiosClient.get(url);
  },
  getActiveProjects: () => {
    const url = "/projects/active";
    return axiosClient.get(url);
  },
  getInactiveProjects: () => {
    const url = "/projects/inactive";
    return axiosClient.get(url);
  },
};
export default ProjectAPI;
