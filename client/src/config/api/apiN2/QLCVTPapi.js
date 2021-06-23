import axiosClient from "../../constant/axiosClient";

const QLCVTPapi = {
  getAll: (params) => {
    const url = "/congviectruongphong";
    return axiosClient.get(url, {
      params,
    });
  },

  post: (body) => {
    const url = `/congviectruongphong`;
    return axiosClient.post(url, body);
  },

  put: (id, body) => {
    const url = `/congviectruongphong/${id}`;
    return axiosClient.put(url, body);
  },

  delete: (id) => {
    const url = `/congviectruongphong/${id}`;
    return axiosClient.delete(url);
  },
};
export default QLCVTPapi;