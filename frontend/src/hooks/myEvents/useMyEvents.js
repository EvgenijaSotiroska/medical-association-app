import { useEffect, useState, useCallback } from "react";
import eventApi from "../../api/eventApi.js";

const useMyEvents = () => {
    const [myEvents, setMyEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const memberId = localStorage.getItem("memberId");

    const fetchMyEvents = useCallback(() => {
        setLoading(true);
        eventApi.getMyRegistrations(memberId)
            .then(res => {
                setMyEvents(res.data);
                setError(null);
            })
            .catch(err => {
                setError(err.response?.data?.message || "Error loading events.");
            })
            .finally(() => setLoading(false));
    }, [memberId]);

    useEffect(() => {
        fetchMyEvents();
    }, [fetchMyEvents]);

    return { myEvents, loading, error, fetchMyEvents };
};

export default useMyEvents;