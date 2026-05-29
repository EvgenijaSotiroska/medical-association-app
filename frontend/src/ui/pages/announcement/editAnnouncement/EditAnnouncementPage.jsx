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
    const [imageFile, setImageFile] = useState(null);
    const [documentFile, setDocumentFile] = useState(null);

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
                    imageUrl: imageFile ? null : form.imageUrl,
                    image: imageFile,
                    type: form.type
                });
            } else {
                await publicationApi.update(id, {
                    title: form.title,
                    description: form.description,
                    imageUrl: imageFile ? null : form.imageUrl,
                    image: imageFile,
                    document: documentFile,
                    documentUrl: documentFile ? null : form.documentUrl,
                    type: form.type
                });

            }
            navigate(`/announcements/${type}/${id}`);
        } catch (err) {
            setError(err.response?.data?.message || "Грешка при зачувување.");
        }finally {
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

                    <div className="edit-field">
                        <label className="edit-label">
                            {imageFile ? "Нова слика:" : form.imageUrl ? "Тековна слика — прикачи нова за замена:" : "Прикачи слика:"}
                        </label>
                        {form.imageUrl && !imageFile && (
                            <img
                                src={form.imageUrl}
                                alt="Тековна слика"
                                style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px", marginBottom: "0.5rem" }}
                            />
                        )}
                        <input
                            type="file"
                            className="edit-input"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files[0])}
                        />
                        {imageFile && (
                            <p style={{ fontSize: "0.85rem", color: "#555", marginTop: 4 }}>
                                🖼️ {imageFile.name}
                            </p>
                        )}
                    </div>

                    {!isEvent && (
                        <div className="edit-field">
                            <label className="edit-label">
                                {form.documentUrl && !documentFile
                                    ? "Тековен документ — прикачи нов за замена:"
                                    : "Прикачи документ (PDF):"}
                            </label>
                            {form.documentUrl && !documentFile && (
                                <a

                                href={form.documentUrl}
                                target="_blank"
                                rel="noreferrer"
                                style={{ display: "block", marginBottom: "0.5rem", color: "#2563eb", fontSize: "0.9rem" }}
                                >
                                📄 Отвори тековен документ
                                </a>
                                )}
                            <input
                                type="file"
                                className="edit-input"
                                accept="application/pdf,.doc,.docx,.txt"
                                onChange={(e) => setDocumentFile(e.target.files[0])}
                            />
                            {documentFile && (
                                <p style={{ fontSize: "0.85rem", color: "#555", marginTop: 4 }}>
                                    📄 {documentFile.name}
                                </p>
                            )}
                        </div>
                    )}

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