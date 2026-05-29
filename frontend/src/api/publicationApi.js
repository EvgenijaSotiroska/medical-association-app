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
        const formData = data instanceof FormData ? data : (() => {
            const fd = new FormData();
            fd.append('title', data.title);
            fd.append('description', data.description);
            fd.append('type', data.type);
            if (data.imageUrl) fd.append('imageUrl', data.imageUrl);
            if (data.image) fd.append('image', data.image);
            if (data.document) fd.append('document', data.document);
            return fd;
        })();

        return await axiosInstance.post('/publications', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },
    delete: async (id) => {
        return await axiosInstance.delete(`/publications/${id}`);
    },
    update: async (id, data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('type', data.type);
        if (data.imageUrl) formData.append('imageUrl', data.imageUrl);
        if (data.image) formData.append('image', data.image);
        if (data.document) formData.append('document', data.document);
        if (data.documentUrl) formData.append('documentUrl', data.documentUrl); // ← додај
        return await axiosInstance.put(`/publications/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },

};

export default publicationApi;