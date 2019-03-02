import axios from "axios";
const API_URL = "http://localhost:8081";

export const Api = {
  getReviews(page) {
    return axios.get(`${API_URL}/${page}`).then(res => res.data);
  }
};
