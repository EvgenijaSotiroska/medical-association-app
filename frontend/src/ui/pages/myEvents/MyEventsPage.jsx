import { useNavigate } from "react-router";
import useMyEvents from "../../../hooks/myEvents/useMyEvents.js";
import "./MyEventsPage.css";

export default function MyEventsPage() {
    const { myEvents, loading, error } = useMyEvents();
    const navigate = useNavigate();

    const formatDate = (dateStr) => {
        if (!dateStr) return "—";
        return new Date(dateStr).toLocaleDateString("mk-MK");
    };

    return (
        <div className="myevents-page">
            <div className="myevents-header">
                <h1 className="myevents-title">Мои пријави</h1>
                <p className="myevents-subtitle">Настани на кои сте пријавени</p>
            </div>

            {loading && <div className="myevents-empty">Се вчитува...</div>}
            {error && <div className="myevents-empty">{error}</div>}

            {!loading && !error && myEvents.length === 0 && (
                <div className="myevents-empty">
                    <p>Не сте пријавени на ниту еден настан.</p>
                    <button
                        className="myevents-btn"
                        onClick={() => navigate("/announcements")}
                    >
                        Прегледај соопштенија
                    </button>
                </div>
            )}

            {!loading && !error && myEvents.length > 0 && (
                <div className="myevents-grid">
                    {myEvents.map(reg => (
                        <div
                            key={reg.id}
                            className="myevents-card"
                            onClick={() => navigate(`/announcements/event/${reg.eventId}`)}
                        >
                            <div className="myevents-card__body">
                                <h3 className="myevents-card__title">{reg.eventTitle}</h3>
                                <p className="myevents-card__date">
                                    📅 Пријавен на: {formatDate(reg.registeredAt)}
                                </p>
                            </div>
                            <span className="myevents-card__cta">Погледај →</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}