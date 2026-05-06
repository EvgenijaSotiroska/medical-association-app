import { useState } from "react";
import eventApi from "../../api/eventApi.js";

const useCreateEvent = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const createEvent = async (data) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const response = await eventApi.create(data);
            setSuccess(true);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || "Error creating event.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { createEvent, loading, error, success };
};

export default useCreateEvent;