import axiosClient from "../../constant/axiosClient";

const QLCVLDapi = {
  getAll: (params) => {
    const url = "/congviec";
    return axiosClient.get(url, {
      params,
    });
  },

  post: (body) => {
    const url = `/congviec`;
    return axiosClient.post(url, body);
  },

  put: (id, body) => {
    const url = `/congviec/${id}`;
    return axiosClient.put(url, body);
  },

  delete: (id) => {
    const url = `/congviec/${id}`;
    return axiosClient.delete(url);
  },
};
export default QLCVLDapi;