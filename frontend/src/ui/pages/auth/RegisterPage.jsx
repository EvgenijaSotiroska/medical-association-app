import { useState } from "react";
import { Link } from "react-router";
import "./AuthPages.css";
import { useRegister } from "../../../hooks/auth/useRegister.js";

export default function RegisterPage() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",

        email: "",
        phone: "",
        address: "",

        username: "",
        password: "",
        confirmPassword: "",

        institution: "",
        position: "",
        specialization: "",
        subSpecialization: "",
        licenseNumber: "",
        graduationYear: "",

        diploma: null,
        licenseDocument: null
    });

    const [validationError, setValidationError] = useState("");
    const { register, loading, error, success } = useRegister();

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationError("");

        if (form.password !== form.confirmPassword) {
            setValidationError("Лозинките не се совпаѓаат.");
            return;
        }

        const payload = {
            firstName: form.firstName,
            lastName: form.lastName,
            dateOfBirth: form.dateOfBirth,
            email: form.email,
            phone: form.phone,
            address: form.address,
            username: form.username,
            password: form.password,
            institution: form.institution,
            position: form.position,
            specialization: form.specialization,
            subSpecialization: form.subSpecialization,
            licenseNumber: form.licenseNumber,
            graduationYear: form.graduationYear
        };

        try {
            await register(payload);
        } catch (_) {}
    };

    return (
        <div className="auth-page">
            <div className="auth-card auth-card--wide">
                <div className="auth-logo">ЗИ</div>

                <h1 className="auth-title">Регистрација</h1>
                <p className="auth-subtitle">аплицирај за членство</p>

                {success ? (
                    <div className="auth-success">
                        <p>Вашата апликација е успешно поднесена. </p>
                        <p>Ќе бидете контактирани по одобрување.</p>
                        <Link to="/" className="auth-link">
                            Назад кон најава
                        </Link>
                    </div>
                ) : (
                    <form className="auth-form" onSubmit={handleSubmit}>
                        {/* Personal */}
                        <h3 className="auth-section-title">Лични податоци</h3>

                        <div className="auth-row">
                            <input name="firstName" placeholder="Име" className="auth-input" onChange={handleChange} required />
                            <input name="lastName" placeholder="Презиме" className="auth-input" onChange={handleChange} required />
                        </div>

                        <div className="auth-field">
                            <label className="auth-label">Датум на раѓање</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                className="auth-input"
                                value={form.dateOfBirth}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Contact */}
                        <h3 className="auth-section-title">Контакт</h3>

                        <input name="email" type="email" placeholder="Email" className="auth-input" onChange={handleChange} required />

                        <div className="auth-row">
                            <input name="phone" placeholder="Телефон" className="auth-input" onChange={handleChange} required />
                            <input name="address" placeholder="Адреса" className="auth-input" onChange={handleChange} required />
                        </div>

                        {/* Auth */}
                        <h3 className="auth-section-title">Кориснички податоци</h3>

                        <input name="username" placeholder="Корисничко име" className="auth-input" onChange={handleChange} required />

                        <div className="auth-row">
                            <input type="password" name="password" placeholder="Лозинка" className="auth-input" onChange={handleChange} required />
                            <input type="password" name="confirmPassword" placeholder="Потврди лозинка" className="auth-input" onChange={handleChange} required />
                        </div>

                        {/* Professional */}
                        <h3 className="auth-section-title">Професионални податоци</h3>

                        <input name="institution" placeholder="Здравствена установа" className="auth-input" onChange={handleChange} required />
                        <input name="position" placeholder="Работно место / позиција" className="auth-input" onChange={handleChange} required />
                        <input name="specialization" placeholder="Специјализација" className="auth-input" onChange={handleChange} required />
                        <input name="subSpecialization" placeholder="Под-специјализација" className="auth-input" onChange={handleChange} />

                        <div className="auth-row">
                            <input name="licenseNumber" placeholder="Лиценцен број" className="auth-input" onChange={handleChange} required />
                            <input type="number" name="graduationYear" placeholder="Година на дипломирање" className="auth-input" onChange={handleChange} required />
                        </div>

                        {(validationError || error) && (
                            <p className="auth-error">{validationError || error}</p>
                        )}

                        <button className="auth-btn" type="submit" disabled={loading}>
                            {loading ? "Се регистрира..." : "Регистрирај се"}
                        </button>
                    </form>
                )}

                {!success && (
                    <p className="auth-footer">
                        Веќе имате сметка?{" "}
                        <Link to="/" className="auth-link">
                            Најавете се
                        </Link>
                    </p>
                )}
            </div>
        </div>
    );
}