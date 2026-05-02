import { useState } from "react";
import { Link, useNavigate } from "react-router";
import "./AuthPages.css";
import {useRegister} from "../../hooks/useRegister.js";

export default function RegisterPage() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [validationError, setValidationError] = useState("");
    const { register, loading, error, success } = useRegister();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationError("");

        if (form.password !== form.confirmPassword) {
            setValidationError("Лозинките не се совпаѓаат.");
            return;
        }

        try {
            await register(
                form.firstName,
                form.lastName,
                form.email,
                form.username,
                form.password
            );
            navigate("/");
        } catch (_) {
            // error handled by hook
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card auth-card--wide">
                <div className="auth-logo">ЗИ</div>

                <h1 className="auth-title">Регистрација</h1>
                <p className="auth-subtitle">аплицирај за членство</p>

                {success ? (
                    <div className="auth-success">
                        <p>Вашата апликација е поднесена успешно.</p>
                        <p>Ќе бидете контактирани наскоро.</p>
                        <Link to="/" className="auth-link">
                            Назад кон најава
                        </Link>
                    </div>
                ) : (
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="auth-row">
                            <div className="auth-field">
                                <label className="auth-label" htmlFor="firstName">
                                    Име
                                </label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    className="auth-input"
                                    type="text"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="auth-field">
                                <label className="auth-label" htmlFor="lastName">
                                    Презиме
                                </label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    className="auth-input"
                                    type="text"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="auth-field">
                            <label className="auth-label" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                className="auth-input"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                autoComplete="email"
                            />
                        </div>

                        <div className="auth-field">
                            <label className="auth-label" htmlFor="username">
                                Корисничко име
                            </label>
                            <input
                                id="username"
                                name="username"
                                className="auth-input"
                                type="text"
                                value={form.username}
                                onChange={handleChange}
                                required
                                autoComplete="username"
                            />
                        </div>

                        <div className="auth-row">
                            <div className="auth-field">
                                <label className="auth-label" htmlFor="password">
                                    Лозинка
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    className="auth-input"
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    autoComplete="new-password"
                                />
                            </div>

                            <div className="auth-field">
                                <label className="auth-label" htmlFor="confirmPassword">
                                    Потврди лозинка
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="auth-input"
                                    type="password"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    autoComplete="new-password"
                                />
                            </div>
                        </div>

                        {(validationError || error) && (
                            <p className="auth-error">{validationError || error}</p>
                        )}

                        <button
                            className="auth-btn"
                            type="submit"
                            disabled={loading}
                        >
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
