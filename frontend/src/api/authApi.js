import axiosInstance from "../axios/axios";


const authApi = {
    register: async (firstName, lastName, email, username, password) => {
        return await axiosInstance.post('/user/register', {
            firstName,
            lastName,
            email,
            username,
            password,
        });
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
