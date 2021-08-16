import axios from "axios";

const api = axios.create({
  baseURL: "https://mern-blog-backend-mct.herokuapp.com",
});

export default api;
