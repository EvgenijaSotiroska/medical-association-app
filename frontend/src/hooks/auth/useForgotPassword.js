import { useState } from "react";
import authApi from "../../api/authApi.js";

const useForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const forgotPassword = async (email) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            await authApi.forgotPassword(email);
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || "Грешка при испраќање на мејл.");
        } finally {
            setLoading(false);
        }
    };

    return { forgotPassword, loading, error, success };
};

export default useForgotPassword;