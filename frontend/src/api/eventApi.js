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
    isRegistered: async (eventId, memberId) => {
        return await axiosInstance.get(`/events/${eventId}/is-registered/${memberId}`);
    },
    getMyRegistrations: async (memberId) => {
        return await axiosInstance.get(`/events/my-events/${memberId}`);
    },

    cancelRegistration: async (eventId, memberId) => {
        return await axiosInstance.delete(`/events/${eventId}/cancel/${memberId}`);
    },
    exportRegistrations: async (eventId) => {
        const response = await axiosInstance.get(
            `/events/${eventId}/registrations/export`,
            { responseType: "blob" }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `registrations-${eventId}.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    }
};

export default eventApi;