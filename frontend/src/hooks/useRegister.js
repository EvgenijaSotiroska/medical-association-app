import { useState } from "react";
import authApi from "../api/authApi.js";

export const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState(null);

    const register = async (formData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        setMessage(null);

        try {
            const data = await authApi.register(formData);

            setSuccess(true);
            setMessage(data?.message);
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { register, loading, error, success, message };
};