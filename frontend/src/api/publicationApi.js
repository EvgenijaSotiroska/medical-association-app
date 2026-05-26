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

    create: async (formData) => {
        return await axiosInstance.post('/publications', formData, {
            transformRequest: (data, headers) => {
                delete headers["Content-Type"];
                return data;
            }
        });
    },
    delete: async (id) => {
        return await axiosInstance.delete(`/publications/${id}`);
    },
    update: async (id, data) => {
        return await axiosInstance.put(`/publications/${id}`, data);
    },

};

export default publicationApi;