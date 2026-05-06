import { useState } from "react";
import { useNavigate } from "react-router";
import useCreateEvent from "../../../hooks/events/useCreateEvent.js";
import "./CreateEventPage.css";

export default function CreateEventPage() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        eventDate: "",
        location: "",
        imageUrl: "",
        type: "CONGRESS"
    });

    const { createEvent, loading, error, success } = useCreateEvent();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createEvent(form);
        } catch (_) {}
    };

    const typeLabel = {
        CONGRESS: "Конгрес",
        SEMINAR: "Семинар"
    };

    return (
        <div className="create-page">
            <div className="create-card">
                <h1 className="create-title">Креирај настан</h1>
                <p className="create-subtitle">Конгрес или семинар</p>

                {success ? (
                    <div className="create-success">
                        <p>✅ Настанот е успешно креиран!</p>
                        <div className="create-success__actions">
                            <button
                                className="create-btn"
                                onClick={() => navigate("/announcements")}
                            >
                                Погледај соопштенија
                            </button>
                            <button
                                className="create-btn create-btn--outline"
                                onClick={() => {
                                    setForm({
                                        title: "",
                                        description: "",
                                        eventDate: "",
                                        location: "",
                                        imageUrl: "",
                                        type: "CONGRESS"
                                    });
                                }}
                            >
                                Креирај уште еден
                            </button>
                        </div>
                    </div>
                ) : (
                    <form className="create-form" onSubmit={handleSubmit}>

                        {/* Type */}
                        <div className="create-field">
                            <label className="create-label">Тип на настан</label>
                            <div className="create-type-btns">
                                {["CONGRESS", "SEMINAR"].map(t => (
                                    <button
                                        key={t}
                                        type="button"
                                        className={`create-type-btn ${form.type === t ? "active" : ""}`}
                                        onClick={() => setForm(prev => ({ ...prev, type: t }))}
                                    >
                                        {typeLabel[t]}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Title */}
                        <div className="create-field">
                            <label className="create-label">Наслов</label>
                            <input
                                name="title"
                                className="create-input"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Наслов на настанот"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="create-field">
                            <label className="create-label">Опис</label>
                            <textarea
                                name="description"
                                className="create-input create-textarea"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Опис на настанот"
                                rows={5}
                                required
                            />
                        </div>

                        {/* Date + Location */}
                        <div className="create-row">
                            <div className="create-field">
                                <label className="create-label">Датум</label>
                                <input
                                    type="date"
                                    name="eventDate"
                                    className="create-input"
                                    value={form.eventDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="create-field">
                                <label className="create-label">Локација</label>
                                <input
                                    name="location"
                                    className="create-input"
                                    value={form.location}
                                    onChange={handleChange}
                                    placeholder="Град, место..."
                                    required
                                />
                            </div>
                        </div>

                        {/* Image URL */}
                        <div className="create-field">
                            <label className="create-label">URL на слика</label>
                            <input
                                name="imageUrl"
                                className="create-input"
                                value={form.imageUrl}
                                onChange={handleChange}
                                placeholder="https://..."
                            />
                        </div>

                        {error && <p className="create-error">{error}</p>}

                        <button
                            className="create-btn"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Се креира..." : "Креирај настан"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}