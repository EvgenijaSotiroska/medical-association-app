import { useState } from "react";
import eventApi from "../../api/eventApi.js";

const useRegisterForEvent = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const register = async (eventId, memberId) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const response = await eventApi.registerForEvent(eventId, memberId);
            setSuccess(true);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || "Error registering for event.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { register, loading, error, success };
};

export default useRegisterForEvent;