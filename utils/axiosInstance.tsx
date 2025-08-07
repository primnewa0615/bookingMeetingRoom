// create axios instance with base URL and interceptors
import axios from "axios";
export const axiosInstance = axios.create({
  baseURL:
    process.env.EXPO_PUBLIC_API_URL || "https://uat-api.ftlgym.com/api/v1/test", // Use environment variable or default URL
  timeout: 10000, // Set a timeout of 10 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
