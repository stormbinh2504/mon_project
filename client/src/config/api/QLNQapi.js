import axiosClient from "../constant/axiosClient";

const QLNQapi = {
  getAll: (params) => {
    const url = "/nhomquyen";
    return axiosClient.get(url, {
      params,
    });
  },

  post: (body) => {
    const url = `/nhomquyen`;
    return axiosClient.post(url, body);
  },

  put: (id, body) => {
    const url = `/nhomquyen/${id}`;
    return axiosClient.put(url, body);
  },

  delete: (id) => {
    const url = `/nhomquyen/${id}`;
    return axiosClient.delete(url);
  },
};
export default QLNQapi;
