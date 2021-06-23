import axiosClient from "../constant/axiosClient";

const QLBPapi = {
    getAll: (params) => {
        const url = "/bophan";
        return axiosClient.get(url, { 
            params
        });
        
    },

    delete: (id) => {
        const url = `/bophan/${id}`;
        return axiosClient.delete(url);
    },
    
    get: (id) => {
        const url = `/bophan`;
        return axiosClient.get(url);
    },

    post: (body) => {
        const url = `/bophan`;
        return axiosClient.post(url,body);
    },

    put: (id,body) => {
        const url = `/bophan/${id}`;
        return axiosClient.put(url,body);
    },


}
export default QLBPapi;
