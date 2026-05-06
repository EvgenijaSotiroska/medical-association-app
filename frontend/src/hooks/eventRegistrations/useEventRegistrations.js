import { useEffect, useState, useCallback } from "react";
import eventApi from "../../api/eventApi.js";

const useEventRegistrations = (eventId) => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRegistrations = useCallback(() => {
        setLoading(true);
        eventApi.getRegistrations(eventId)
            .then(response => {
                setRegistrations(response.data);
                setError(null);
            })
            .catch(err => {
                console.error(err);
                setError(err);
            })
            .finally(() => setLoading(false));
    }, [eventId]);

    useEffect(() => {
        fetchRegistrations();
    }, [fetchRegistrations]);

    return { registrations, loading, error, fetchRegistrations };
};

export default useEventRegistrations;