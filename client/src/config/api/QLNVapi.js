import axiosClient from "../constant/axiosClient";

const QLNVapi = {
    getAll: (params) => {
        const url = "/nhanvien";
        return axiosClient.get(url, {
            params
        });

    },

    delete: (id) => {
        const url = `/nhanvien/${id}`;
        return axiosClient.delete(url);
    },


    post: (body) => {
        const url = `/nhanvien`;
        return axiosClient.post(url, body);
    },

    put: (id, body) => {
        const url = `/nhanvien/${id}`;
        return axiosClient.put(url, body);
    },


}
export default QLNVapi;