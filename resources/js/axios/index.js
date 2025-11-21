import axios from "axios";

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error.response);
  }
);
export { api };
