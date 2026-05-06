import { useEffect, useState, useCallback } from "react";
import eventApi from "../../api/eventApi.js";

const useEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEvents = useCallback(() => {
        setLoading(true);
        eventApi.findAll()
            .then(response => {
                setEvents(response.data);
                setError(null);
            })
            .catch(err => {
                console.error(err);
                setError(err);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    return { events, loading, error, fetchEvents };
};

export default useEvents;