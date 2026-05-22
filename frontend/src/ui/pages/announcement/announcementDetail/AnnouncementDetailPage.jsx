import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import eventApi from "../../../../api/eventApi.js";
import publicationApi from "../../../../api/publicationApi.js";
import useRegisterForEvent from "../../../../hooks/eventRegistrations/useRegisterForEvent.js";
import "./AnnouncementDetailPage.css";
import { getUserRole } from "../../../../utils/auth.js";

export default function AnnouncementDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const type = window.location.pathname.includes("/event/") ? "event" : "publication";

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [checkingRegistration, setCheckingRegistration] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);
    const [registrations, setRegistrations] = useState([]);
    const [registrationsCount, setRegistrationsCount] = useState(0);
    const [showRegistrations, setShowRegistrations] = useState(false);
    const [loadingRegistrations, setLoadingRegistrations] = useState(false);

    const { register, cancel, loading: registering, error: registerError } = useRegisterForEvent();

    const role = getUserRole();
    const isAdmin = role === "ROLE_ADMINISTRATOR";
    const memberId = localStorage.getItem("memberId");

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

    useEffect(() => {
        if (!memberId || type !== "event") return;
        setCheckingRegistration(true);
        eventApi.isRegistered(id, memberId)
            .then(res => setIsRegistered(res.data))
            .catch(() => setIsRegistered(false))
            .finally(() => setCheckingRegistration(false));
    }, [id, memberId, type]);

    useEffect(() => {
        if (!isAdmin || type !== "event") return;
        eventApi.getRegistrations(id)
            .then(res => setRegistrationsCount(res.data.length))
            .catch(() => setRegistrationsCount(0));
    }, [id, isAdmin, type]);

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

    const handleRegister = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
        }
        setShowConfirm(true);
    };

    const handleCancel = () => {
        setShowCancelConfirm(true);
    };

    const confirmRegister = async () => {
        setShowConfirm(false);
        try {
            await register(item.id, memberId);
            setIsRegistered(true);
            setRegistrationsCount(prev => prev + 1);
        } catch (_) {}
    };

    const confirmCancel = async () => {
        setShowCancelConfirm(false);
        try {
            await cancel(item.id, memberId);
            setIsRegistered(false);
            setRegistrationsCount(prev => prev - 1);
        } catch (_) {}
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

    const fetchRegistrations = async () => {
        if (showRegistrations) {
            setShowRegistrations(false);
            return;
        }
        setLoadingRegistrations(true);
        try {
            const res = await eventApi.getRegistrations(id);
            setRegistrations(res.data);
            setShowRegistrations(true);
        } catch {
            setRegistrations([]);
        } finally {
            setLoadingRegistrations(false);
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

                <button className="detail-close-btn" onClick={() => navigate(-1)}>✕</button>

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

                    {canRegister && !checkingRegistration && (
                        <div className="detail-register">
                            {isRegistered ? (
                                <>
                                    {showCancelConfirm ? (
                                        <div className="detail-confirm">
                                            <p>Дали сте сигурни дека сакате да ја откажете пријавата?</p>
                                            <div className="detail-confirm__actions">
                                                <button
                                                    className="detail-confirm__btn detail-confirm__btn--yes"
                                                    onClick={confirmCancel}
                                                >
                                                    Да, откажи
                                                </button>
                                                <button
                                                    className="detail-confirm__btn detail-confirm__btn--no"
                                                    onClick={() => setShowCancelConfirm(false)}
                                                >
                                                    Не
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            className="detail-register__btn detail-register__btn--cancel"
                                            onClick={handleCancel}
                                            disabled={registering}
                                        >
                                            {registering ? "Се откажува..." : "❌ Откажи пријава"}
                                        </button>
                                    )}
                                </>
                            ) : (
                                <>
                                    {showConfirm ? (
                                        <div className="detail-confirm">
                                            <p>Дали сте сигурни дека сакате да се пријавите на <strong>{item.title}</strong>?</p>
                                            <div className="detail-confirm__actions">
                                                <button
                                                    className="detail-confirm__btn detail-confirm__btn--yes"
                                                    onClick={confirmRegister}
                                                >
                                                    Да, пријави се
                                                </button>
                                                <button
                                                    className="detail-confirm__btn detail-confirm__btn--no"
                                                    onClick={() => setShowConfirm(false)}
                                                >
                                                    Откажи
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            className="detail-register__btn"
                                            onClick={handleRegister}
                                            disabled={registering}
                                        >
                                            {registering ? "Се пријавува..." : "Пријави се"}
                                        </button>
                                    )}
                                </>
                            )}
                            {registerError && (
                                <p className="detail-register__error">{registerError}</p>
                            )}
                        </div>
                    )}

                    {isAdmin && isEvent && (
                        <div className="detail-registrations">
                            <div className="detail-registrations__header">
                                <span className="detail-registrations__count">
                                    👥 Пријавени членови: {showRegistrations ? registrations.length : registrationsCount}
                                </span>
                                <div style={{ display: "flex", gap: "8px" }}>
                                    <button
                                        className="detail-registrations__toggle"
                                        onClick={fetchRegistrations}
                                        disabled={loadingRegistrations}
                                    >
                                        {loadingRegistrations ? "Се вчитува..." : showRegistrations ? "Затвори" : "▼ Прикажи"}
                                    </button>
                                    <button
                                        className="detail-registrations__toggle"
                                        onClick={() => eventApi.exportRegistrations(id)}
                                    >
                                        ⬇ Преземи CSV
                                    </button>
                                </div>
                            </div>

                            {showRegistrations && (
                                <table className="detail-registrations__table">
                                    <thead>
                                    <tr>
                                        <th>Име</th>
                                        <th>Презиме</th>
                                        <th>Корисничко име</th>
                                        <th>Датум на пријава</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {registrations.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="detail-registrations__empty">
                                                Нема пријавени членови.
                                            </td>
                                        </tr>
                                    ) : (
                                        registrations.map(r => (
                                            <tr key={r.id}>
                                                <td>{r.firstName ?? "—"}</td>
                                                <td>{r.lastName ?? "—"}</td>
                                                <td>{r.memberUsername}</td>
                                                <td>{new Date(r.registeredAt).toLocaleDateString("mk-MK")}</td>
                                            </tr>
                                        ))
                                    )}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}