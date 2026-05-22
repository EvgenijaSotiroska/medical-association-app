import { useState } from "react";
import authApi from "../../api/authApi.js";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);

    const login = async (username, password) => {
        setLoading(true);
        try {
            const data = await authApi.login(username, password);
            return data;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading };
};