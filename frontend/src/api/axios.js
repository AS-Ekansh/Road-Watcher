import axios from "axios";

const instance = axios.create({
  baseURL: "https://road-watcher.onrender.com/api",
  withCredentials: true,
});

export default instance;
