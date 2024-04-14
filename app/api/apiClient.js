import axios from "axios";

const apiClient = axios.create({
  // baseURL: "http://frontend:3000/api",
  baseURL: "http://localhost:8080",

  // baseURL: "http://proxy:3002/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
