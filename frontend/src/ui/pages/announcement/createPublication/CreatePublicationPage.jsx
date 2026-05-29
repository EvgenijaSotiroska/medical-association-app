import { useState } from "react";
import { useNavigate } from "react-router";
import useCreatePublication from "../../../../hooks/publications/useCreatePublication.js";
import "./CreatePublicationPage.css";

export default function CreatePublicationPage() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        type: "NEWS"
    });
    const [imageFile, setImageFile] = useState(null);
    const [documentFile, setDocumentFile] = useState(null);
    const { createPublication, loading, error, success } = useCreatePublication();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("type", form.type);
        if (imageFile) {
            formData.append("image", imageFile);
        }
        if (form.type === "DOCUMENT" && documentFile) {
            formData.append("document", documentFile);
        }

        try {
            await createPublication(formData);
        } catch (_) {}
    };

    const typeLabel = { NEWS: "Новост", DOCUMENT: "Документ" };

    return (
        <div className="create-page">
            <div className="create-card">
                <h1 className="create-title">Креирај објава</h1>
                <p className="create-subtitle">Документ или новост</p>

                {success ? (
                    <div className="create-success">
                        <p>✅ Објавата е успешно креирана!</p>
                        <div className="create-success__actions">
                            <button className="create-btn" onClick={() => navigate("/announcements")}>
                                Погледај соопштенија
                            </button>
                            <button
                                className="create-btn create-btn--outline"
                                onClick={() => {
                                    setForm({ title: "", description: "", type: "NEWS" });
                                    setImageFile(null);
                                    setDocumentFile(null);
                                }}
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
                            <label className="create-label">Прикачи слика</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="create-input"
                                onChange={(e) => setImageFile(e.target.files[0])}
                            />
                            {imageFile && (
                                <p style={{ fontSize: "0.85rem", color: "#555", marginTop: 4 }}>
                                    🖼️ {imageFile.name}
                                </p>
                            )}
                        </div>

                        {form.type === "DOCUMENT" && (
                            <div className="create-field">
                                <label className="create-label">Прикачи документ </label>
                                <input
                                    type="file"
                                    accept="*"
                                    className="create-input"
                                    onChange={(e) => setDocumentFile(e.target.files[0])}
                                    required
                                />
                                {documentFile && (
                                    <p style={{ fontSize: "0.85rem", color: "#555", marginTop: 4 }}>
                                        📄 {documentFile.name}
                                    </p>
                                )}
                            </div>
                        )}

                        {error && <p className="create-error">{error}</p>}

                        <button className="create-btn" type="submit" disabled={loading}>
                            {loading ? "Се креира..." : "Креирај објава"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}