import axios from "axios";

// Create an Axios instance with the base URL and Authorization header
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Base URL for your API
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include access token in the headers
  },
});

// Request interceptor to ensure the latest token is used for every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Dynamically set Authorization header
    }
    return config;
  },
  (error) => Promise.reject(error) // Handle request errors
);

// Response interceptor for handling errors (e.g., token expiration)
axiosInstance.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token and it hasn't been retried
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true;
      try {
        // Refresh the access token
        const refreshToken = localStorage.getItem("refreshToken");
        const refreshResponse = await axios.post(
          `${axiosInstance.defaults.baseURL}/token/refresh/`,
          { refresh: refreshToken }
        );

        // Save the new access token
        const newAccessToken = refreshResponse.data.access;
        localStorage.setItem("accessToken", newAccessToken);

        // Update the Authorization header in the Axios instance and the original request
        axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error(
          "Token refresh failed:",
          refreshError.response?.data || refreshError.message
        );

        // Clear tokens and redirect to login
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }

    // For other errors, reject the promise
    return Promise.reject(error);
  }
);

export default axiosInstance;
