
import axios from "axios";
const api = axios.create({
    //  baseURL: "http://localhost:5000/", // Your API base URL
    baseURL: "http://62.72.29.190:5000", // if your backend is running on port 5000

withCredentials: true, // Include credentials with requests
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  });
  export default api;
