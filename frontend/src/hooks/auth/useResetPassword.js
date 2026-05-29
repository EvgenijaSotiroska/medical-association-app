import { useState } from "react";
import authApi from "../../api/authApi.js";

const useResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const resetPassword = async (data) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            await authApi.resetPassword(data);
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || "Грешка при ресетирање на лозинка.");
        } finally {
            setLoading(false);
        }
    };

    return { resetPassword, loading, error, success };
};

export default useResetPassword;