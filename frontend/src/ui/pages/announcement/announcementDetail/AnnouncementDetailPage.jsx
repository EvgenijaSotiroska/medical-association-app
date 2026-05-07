import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import eventApi from "../../../../api/eventApi.js";
import publicationApi from "../../../../api/publicationApi.js";
import useRegisterForEvent from "../../../../hooks/eventRegistrations/useRegisterForEvent.js";
import "./AnnouncementDetailPage.css";
import {getUserRole} from "../../../../utils/auth.js";

export default function AnnouncementDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const type = window.location.pathname.includes("/event/") ? "event" : "publication";

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const { register, loading: registering, success, error: registerError } = useRegisterForEvent();

    const role = getUserRole();
    const isAdmin = role === "ROLE_ADMINISTRATOR";

    useEffect(() => {
        setLoading(true);
        const request = type === "event"
            ? eventApi.findById(id)
            : publicationApi.findById(id);

        request
            .then(res => setItem(res.data))
            .catch(() => setError("Неуспешно вчитување."))
            .finally(() => setLoading(false));
    }, [id, type]);

    const isEvent = type === "event";
    const canRegister = isEvent && (item?.type === "CONGRESS" || item?.type === "SEMINAR");

    const typeLabel = {
        CONGRESS: "Конгрес",
        SEMINAR: "Семинар",
        DOCUMENT: "Документ",
        NEWS: "Новост"
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        return new Date(dateStr).toLocaleDateString("mk-MK");
    };

    const handleRegister = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            if (window.confirm("Треба да бидете најавени за да се пријавите на настанот. Дали сакате да одите на страната за најава?")) {
                navigate("/");
            }
            return;
        }

        if (!window.confirm(`Дали сте сигурни дека сакате да се пријавите на настанот "${item.title}"?`)) {
            return;
        }

        await register(item.id, 1);
    };

    const handleDelete = async () => {
        if (!window.confirm("Дали сте сигурни дека сакате да го избришете ова?")) return;
        setDeleting(true);
        try {
            if (type === "event") {
                await eventApi.delete(id);
            } else {
                await publicationApi.delete(id);
            }
            navigate("/announcements");
        } catch {
            setError("Грешка при бришење.");
            setDeleting(false);
        }
    };

    if (loading) return (
        <div className="detail-page">
            <div className="detail-card">
                <div className="detail-empty">Се вчитува...</div>
            </div>
        </div>
    );

    if (error) return (
        <div className="detail-page">
            <div className="detail-card">
                <div className="detail-empty">{error}</div>
            </div>
        </div>
    );

    if (!item) return null;

    return (
        <div className="detail-page" onClick={() => navigate(-1)}>
            <div className="detail-card" onClick={(e) => e.stopPropagation()}>

                {/* Close button */}
                <button
                    className="detail-close-btn"
                    onClick={() => navigate(-1)}
                >
                    ✕
                </button>

                {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} className="detail-img" />
                ) : (
                    <div className="detail-img-placeholder" />
                )}

                <div className="detail-body">

                    <div className="detail-header-row">
                        <div className="detail-meta">
                            <span className={`detail-type detail-type--${item.type?.toLowerCase()}`}>
                                {typeLabel[item.type] ?? item.type}
                            </span>
                            {item.eventDate && (
                                <span className="detail-date">
                                    📅 {formatDate(item.eventDate)}
                                </span>
                            )}
                        </div>

                        {isAdmin && (
                            <div className="detail-admin-actions">
                                <button
                                    className="detail-edit-btn"
                                    onClick={() => navigate(`/announcements/${type}/${id}/edit`)}
                                >
                                    ✏️ Измени
                                </button>
                                <button
                                    className="detail-delete-btn"
                                    onClick={handleDelete}
                                    disabled={deleting}
                                >
                                    {deleting ? "Се брише..." : "🗑 Избриши"}
                                </button>
                            </div>
                        )}
                    </div>

                    <h1 className="detail-title">{item.title}</h1>

                    {item.location && (
                        <p className="detail-location">📍 {item.location}</p>
                    )}

                    {item.authorName && (
                        <p className="detail-author">👤 {item.authorName}</p>
                    )}

                    <p className="detail-desc">{item.description}</p>

                    {canRegister && (
                        <div className="detail-register">
                            {success ? (
                                <div className="detail-register__success">
                                    ✅ Успешно се пријавивте!
                                </div>
                            ) : (
                                <>
                                    <button
                                        className="detail-register__btn"
                                        onClick={handleRegister}
                                        disabled={registering}
                                    >
                                        {registering ? "Се пријавува..." : "Пријави се"}
                                    </button>
                                    {registerError && (
                                        <p className="detail-register__error">{registerError}</p>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}