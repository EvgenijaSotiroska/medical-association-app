import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import eventApi from "../../../../api/eventApi.js";
import publicationApi from "../../../../api/publicationApi.js";
import "./EditAnnouncementPage.css";

export default function EditAnnouncementPage() {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [form, setForm] = useState(null);

    useEffect(() => {
        const request = type === "event"
            ? eventApi.findById(id)
            : publicationApi.findById(id);

        request
            .then(res => setForm(res.data))
            .catch(() => setError("Неуспешно вчитување."))
            .finally(() => setLoading(false));
    }, [id, type]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        try {
            if (type === "event") {
                await eventApi.update(id, {
                    title: form.title,
                    description: form.description,
                    eventDate: form.eventDate,
                    location: form.location,
                    imageUrl: form.imageUrl,
                    type: form.type
                });
            } else {
                await publicationApi.update(id, {
                    title: form.title,
                    description: form.description,
                    imageUrl: form.imageUrl,
                    type: form.type
                });
            }
            navigate(`/announcements/${type}/${id}`);
        } catch {
            setError("Грешка при зачувување.");
        } finally {
            setSaving(false);
        }
    };

    const isEvent = type === "event";

    const eventTypes = ["CONGRESS", "SEMINAR"];
    const publicationTypes = ["NEWS", "DOCUMENT"];
    const types = isEvent ? eventTypes : publicationTypes;

    const typeLabel = {
        CONGRESS: "Конгрес",
        SEMINAR: "Семинар",
        NEWS: "Новост",
        DOCUMENT: "Документ"
    };

    if (loading) return <div className="edit-empty">Се вчитува...</div>;
    if (error && !form) return <div className="edit-empty">{error}</div>;
    if (!form) return null;

    return (
        <div className="edit-page">
            <div className="edit-card">
                <h1 className="edit-title">
                    {isEvent ? "Измени настан" : "Измени објава"}
                </h1>

                <form className="edit-form" onSubmit={handleSubmit}>

                    {/* Type */}
                    <div className="edit-field">
                        <label className="edit-label">Тип</label>
                        <div className="edit-type-btns">
                            {types.map(t => (
                                <button
                                    key={t}
                                    type="button"
                                    className={`edit-type-btn ${form.type === t ? "active" : ""}`}
                                    onClick={() => setForm(prev => ({ ...prev, type: t }))}
                                >
                                    {typeLabel[t]}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Title */}
                    <div className="edit-field">
                        <label className="edit-label">Наслов</label>
                        <input
                            name="title"
                            className="edit-input"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="edit-field">
                        <label className="edit-label">Опис</label>
                        <textarea
                            name="description"
                            className="edit-input edit-textarea"
                            value={form.description}
                            onChange={handleChange}
                            rows={5}
                            required
                        />
                    </div>

                    {/* Event specific fields */}
                    {isEvent && (
                        <div className="edit-row">
                            <div className="edit-field">
                                <label className="edit-label">Датум</label>
                                <input
                                    type="date"
                                    name="eventDate"
                                    className="edit-input"
                                    value={form.eventDate ?? ""}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="edit-field">
                                <label className="edit-label">Локација</label>
                                <input
                                    name="location"
                                    className="edit-input"
                                    value={form.location ?? ""}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* Image URL */}
                    <div className="edit-field">
                        <label className="edit-label">URL на слика</label>
                        <input
                            name="imageUrl"
                            className="edit-input"
                            value={form.imageUrl ?? ""}
                            onChange={handleChange}
                            placeholder="https://..."
                        />
                    </div>

                    {error && <p className="edit-error">{error}</p>}

                    <div className="edit-actions">
                        <button
                            type="button"
                            className="edit-btn edit-btn--outline"
                            onClick={() => navigate(`/announcements/${type}/${id}`)}
                        >
                            Откажи
                        </button>
                        <button
                            type="submit"
                            className="edit-btn"
                            disabled={saving}
                        >
                            {saving ? "Се зачувува..." : "Зачувај"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}