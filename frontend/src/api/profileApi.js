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
    },
    updateProfilePicture: async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        return await axiosInstance.post('/profile/picture', formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    }
};

export default profileApi;