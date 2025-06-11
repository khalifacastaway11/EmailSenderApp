//services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Backend API URL
  withCredentials: true, // To allow cookies (JWT token) to be sent with each request
});
if (axios.isAxiosError(error)) {
  console.error("API error:", error.response?.data?.message || error.message);
}

export default api;
