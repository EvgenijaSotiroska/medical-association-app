import { useState } from "react";
import { useNavigate } from "react-router";
import useCreatePublication from "../../../hooks/publications/useCreatePublication.js";
import "./CreatePublicationPage.css";

export default function CreatePublicationPage() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        imageUrl: "",
        type: "NEWS"
    });

    const { createPublication, loading, error, success } = useCreatePublication();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPublication(form);
        } catch (_) {}
    };

    const typeLabel = {
        NEWS: "Новост",
        DOCUMENT: "Документ"
    };

    return (
        <div className="create-page">
            <div className="create-card">
                <h1 className="create-title">Креирај објава</h1>
                <p className="create-subtitle">Документ или новост</p>

                {success ? (
                    <div className="create-success">
                        <p>✅ Објавата е успешно креирана!</p>
                        <div className="create-success__actions">
                            <button
                                className="create-btn"
                                onClick={() => navigate("/announcements")}
                            >
                                Погледај соопштенија
                            </button>
                            <button
                                className="create-btn create-btn--outline"
                                onClick={() => setForm({
                                    title: "",
                                    description: "",
                                    imageUrl: "",
                                    type: "NEWS"
                                })}
                            >
                                Креирај уште една
                            </button>
                        </div>
                    </div>
                ) : (
                    <form className="create-form" onSubmit={handleSubmit}>

                        <div className="create-field">
                            <label className="create-label">Тип на објава</label>
                            <div className="create-type-btns">
                                {["NEWS", "DOCUMENT"].map(t => (
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

                        <div className="create-field">
                            <label className="create-label">Наслов</label>
                            <input
                                name="title"
                                className="create-input"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Наслов на објавата"
                                required
                            />
                        </div>

                        <div className="create-field">
                            <label className="create-label">Опис</label>
                            <textarea
                                name="description"
                                className="create-input create-textarea"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Опис на објавата"
                                rows={5}
                                required
                            />
                        </div>

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
                            {loading ? "Се креира..." : "Креирај објава"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}