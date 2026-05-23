import axiosInstance from "../axios/axios.js";

const profileApi = {
    getProfile: async () => {
        return await axiosInstance.get('/profile');
    },

    updateProfile: async (data) => {
        return await axiosInstance.put('/profile', data);
    },

    updatePassword: async (data) => {
        return await axiosInstance.put('/profile/password', data);
    },

    updateEmail: async (data) => {
        return await axiosInstance.put('/profile/email', data);
    }
};

export default profileApi;