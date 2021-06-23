import axiosClient from "../constant/axiosClient";

const QLNVapi = {
    getAll: (params) => {
        const url = "/nguoidung";
        return axiosClient.get(url, {
            params
        });

    },

    delete: (id) => {
        const url = `/nguoidung/${id}`;
        return axiosClient.delete(url);
    },


    post: (body) => {
        const url = `/nguoidung`;
        return axiosClient.post(url, body);
    },

    put: (id, body) => {
        const url = `/nguoidung/${id}`;
        return axiosClient.put(url, body);
    },


}
export default QLNVapi;