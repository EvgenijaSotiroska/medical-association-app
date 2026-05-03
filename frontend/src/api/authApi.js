import axiosInstance from "../axios/axios";


const authApi = {
    register: async (data) => {
        const response = await axiosInstance.post('/user/register', data);
        return response.data;
    },

    login: async (username, password) => {
        const response = await axiosInstance.post("/user/login", {
            username,
            password,
        });

        const token = response.data.token;

        localStorage.setItem("token", token);

        return token;
    }
};

export default authApi;
