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

        const { token, id, role } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("memberId", id);
        localStorage.setItem("role", role);

        return response.data;
    }
};

export default authApi;
