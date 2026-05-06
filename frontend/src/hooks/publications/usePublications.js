import { useEffect, useState, useCallback } from "react";
import publicationApi from "../../api/publicationApi.js";

const usePublications = () => {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPublications = useCallback(() => {
        setLoading(true);
        publicationApi.findAll()
            .then(response => {
                setPublications(response.data);
                setError(null);
            })
            .catch(err => {
                console.error(err);
                setError(err);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchPublications();
    }, [fetchPublications]);

    return { publications, loading, error, fetchPublications };
};

export default usePublications;