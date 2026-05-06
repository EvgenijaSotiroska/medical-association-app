import axiosInstance from "../axios/axios.js";

const eventApi = {
    findAll: async () => {
        return await axiosInstance.get('/events');
    },

    findByType: async (type) => {
        return await axiosInstance.get(`/events?type=${type}`);
    },

    findById: async (id) => {
        return await axiosInstance.get(`/events/${id}`);
    },

    create: async (data) => {
        return await axiosInstance.post('/events', data);
    },

    registerForEvent: async (eventId, memberId) => {
        return await axiosInstance.post(`/events/${eventId}/register/${memberId}`);
    },

    getRegistrations: async (eventId) => {
        return await axiosInstance.get(`/events/${eventId}/registrations`);
    },

    delete: async (id) => {
        return await axiosInstance.delete(`/events/${id}`);
    },
    update: async (id, data) => {
        return await axiosInstance.put(`/events/${id}`, data);
    },
};

export default eventApi;