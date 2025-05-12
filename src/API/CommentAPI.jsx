import axiosClient from "./axiosClient";

const CommentAPI = {
  getComments: (contentId, contentType) => {
    const url = `/projects/${contentId}/comments?contentType=${contentType}`;
    return axiosClient.get(url);
  },
  createComment: (contentId, contentType, body) => {
    const url = `/projects/${contentId}/comments/create?contentType=${contentType}`;
    return axiosClient.post(url, body);
  },
  replyComment: (contentId, contentType, body) => {
    const url = `/projects/${contentId}/comments/reply?contentType=${contentType}`;
    return axiosClient.post(url, body);
  },
  likeComment: (body) => {
    const url = `/projects/comments/like`;
    return axiosClient.post(url, body);
  },
};
export default CommentAPI;
