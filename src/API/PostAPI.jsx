import axiosClient from "./axiosClient";

const PostAPI = {
  createPost: (body) => {
    const url = "/posts/create-post";
    return axiosClient.post(url, body);
  },
  getPostDetail: (id) => {
    const url = `/posts/${id}`;
    return axiosClient.get(url);
  },
  toggleLike: (postId) => {
    const url = `/posts/${postId}/toggle-like`;
    return axiosClient.post(url);
  },
  getAllPosts: () => {
    const url = "/posts";
    return axiosClient.get(url);
  },
  updatePost: (id, body) => {
    const url = `/posts/${id}/update`;
    return axiosClient.post(url, body);
  },
  deletePost: (id) => {
    console.log(id);
    const url = `/posts/${id}/delete`;
    return axiosClient.delete(url);
  },
};

export default PostAPI;
