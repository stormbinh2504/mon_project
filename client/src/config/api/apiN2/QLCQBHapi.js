import axiosClient from "../../constant/axiosClient";

const QLCQBHapi = {
  getAll: (params) => {
    const url = "/coquan";
    return axiosClient.get(url, {
      params,
    });
  },

  post: (body) => {
    const url = `/coquan`;
    return axiosClient.post(url, body);
  },

  put: (id, body) => {
    const url = `/coquan/${id}`;
    return axiosClient.put(url, body);
  },

  delete: (id) => {
    const url = `/coquan/${id}`;
    return axiosClient.delete(url);
  },
};
export default QLCQBHapi;