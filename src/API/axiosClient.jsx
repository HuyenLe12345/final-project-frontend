// api/axiosClient.js
import axios from "axios";
import queryString from "query-string";

// const { base_url } = require("../url");
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#requestconfig` for the full list of configs
const axiosClient = axios.create({
  baseURL: "final-project-backend-production-c0dc.up.railway.app",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  // Handle token here ...
  let token =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken");

  if (token) {
    // If the token exists, set it in the Authorization header
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"]; // Remove content-type header for FormData
  }
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      console.log("200");
      return response.data;
    }

    return response;
  },

  async (error) => {
    if (error.response) {
      console.log(error.response);
      if (
        error.response.status === 401 &&
        error.response.data.message === "Token expired"
      ) {
        console.log(error.response);
        const originalRequest = error.config;
        if (!originalRequest._retry) {
          originalRequest._retry = true; // Avoid infinite loops
          const refreshToken =
            localStorage.getItem("refreshToken") ||
            sessionStorage.getItem("refreshToken");
          if (refreshToken) {
            try {
              const response = await axios.post(
                "http://localhost:8080/users/auth/refresh-token",
                {
                  token: refreshToken,
                }
              );

              if (response.status === 200) {
                console.log(response);
                const { accessToken } = response.data;

                // Update tokens based on where they were stored
                if (localStorage.getItem("refreshToken")) {
                  localStorage.setItem("accessToken", accessToken);
                } else {
                  sessionStorage.setItem("accessToken", accessToken);
                }

                // Cập nhật token trong axiosClient
                axiosClient.defaults.headers.common[
                  "Authorization"
                ] = `Bearer ${accessToken}`;

                // Retry request với token mới
                return axiosClient(originalRequest);
              }
            } catch (refreshError) {
              // Xóa token trước khi chuyển hướng
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              sessionStorage.removeItem("accessToken");
              sessionStorage.removeItem("refreshToken");

              // Chuyển hướng đến trang đăng nhập
              window.location.href = "/sign-in";

              // Trả về lỗi để có thể xử lý thêm nếu cần
              return Promise.reject(refreshError);
            }
          } else {
            // Xóa token trước khi chuyển hướng
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("refreshToken");

            // Chuyển hướng đến trang đăng nhập
            // window.location.href = "/sign-in";

            // Trả về lỗi để có thể xử lý thêm nếu cần
            return Promise.reject(new Error("No refresh token available"));
          }
        }
      } else if (
        error.response.status === 403 &&
        (error.response.data.path === "status" ||
          error.response.data.path === "verify")
      ) {
        window.alert(error.response.data.message);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        window.location.href = "/sign-in";
        return null;
      } else {
        // Trả về cả status và dữ liệu lỗi cho các lỗi khác
        return {
          status: error.response.status,
          errors:
            error.response.data?.errors ||
            error.response.data?.message ||
            "An error occurred",
        };
      }
    } else {
      console.error("Network error:", error);
      return {
        status: 500,
        errors: "Lỗi kết nối. Hãy kiểm tra lại sự kết nối của bạn.",
      };
    }
  }
);
export default axiosClient;
