import { useState } from "react";
import authApi from "../api/authApi.js";

export const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const register = async (firstName, lastName, email, username, password) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await authApi.register(firstName, lastName, email, username, password);
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { register, loading, error, success };
};