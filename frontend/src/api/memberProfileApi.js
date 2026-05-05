import axiosInstance from "../axios/axios.js";

const memberProfileApi = {
    findAll: async () => {
        return await axiosInstance.get('/memberProfiles');
    },

    findAllPending: async () => {
        return await axiosInstance.get('/memberProfiles/pending');
    },

    changeStatus: async (id, status) => {
        return await axiosInstance.post(
            `/memberProfiles/${id}/changeStatus`, status);
    }
};

export default memberProfileApi;