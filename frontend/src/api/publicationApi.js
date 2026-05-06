import axiosInstance from "../axios/axios.js";

const publicationApi = {
    findAll: async () => {
        return await axiosInstance.get('/publications');
    },

    findByType: async (type) => {
        return await axiosInstance.get(`/publications?type=${type}`);
    },

    findById: async (id) => {
        return await axiosInstance.get(`/publications/${id}`);
    },

    create: async (data) => {
        return await axiosInstance.post('/publications', data);
    },
    delete: async (id) => {
        return await axiosInstance.delete(`/publications/${id}`);
    },
    update: async (id, data) => {
        return await axiosInstance.put(`/publications/${id}`, data);
    },

};

export default publicationApi;