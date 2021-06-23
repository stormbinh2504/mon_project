import axiosClient from "../constant/axiosClient";

const QLCDapi = {
  getAll: (params) => {
    const url = "/chucdanh";
    return axiosClient.get(url, {
      params,
    });
  },

  post: (body) => {
    const url = `/chucdanh`;
    return axiosClient.post(url, body);
  },

  put: (id, body) => {
    const url = `/chucdanh/${id}`;
    return axiosClient.put(url, body);
  },

  delete: (id) => {
    const url = `/chucdanh/${id}`;
    return axiosClient.delete(url);
  },
};
export default QLCDapi;