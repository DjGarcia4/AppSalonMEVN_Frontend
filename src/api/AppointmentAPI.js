import api from "../lib/axios.js";
export default {
  create(data) {
    const token = localStorage.getItem("AUTH_TOKEN");
    return api.post("/appointments", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
