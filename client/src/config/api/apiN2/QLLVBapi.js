import axiosClient from "../../constant/axiosClient";

const QLLVBapi = {
  getAll: (params) => {
    const url = "/loaivanban";
    return axiosClient.get(url, {
      params,
    });
  },

  post: (body) => {
    const url = `/loaivanban`;
    return axiosClient.post(url, body);
  },

  put: (id, body) => {
    const url = `/loaivanban/${id}`;
    return axiosClient.put(url, body);
  },

  delete: (id) => {
    const url = `/loaivanban/${id}`;
    return axiosClient.delete(url);
  },
};
export default QLLVBapi;