import axiosClient from "../../constant/axiosClient";

const QLVBDVTapi = {
  getAll: (params) => {
    const url = "/vanbanden";
    return axiosClient.get(url, {
      params,
    });
  },

  post: (body) => {
    const url = `/vanbanden`;
    return axiosClient.post(url, body);
  },

  put: (id, body) => {
    const url = `/vanbanden/${id}`;
    return axiosClient.put(url, body);
  },

  delete: (id) => {
    const url = `/vanbanden/${id}`;
    return axiosClient.delete(url);
  },
};
export default QLVBDVTapi;