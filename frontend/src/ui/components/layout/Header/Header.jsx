import { useState } from "react";
import { Link } from "react-router";
import './Header.css';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <header className="navbar">
                <div className="navbar-brand">
                    Здружение на интернисти
                </div>

                {/* Desktop nav */}
                <nav className="nav-links">
                    <Link to="/">Почетна</Link>
                    <Link to="/announcements">Соопштенија</Link>
                    <Link to="/register">Членство</Link>
                    <Link to="/apply">Пријава за настан</Link>
                </nav>

                <button className="btn-primary">Најава</button>

                {/* Hamburger — mobile only */}
                <button
                    className={`nav-hamburger ${menuOpen ? "is-open" : ""}`}
                    onClick={() => setMenuOpen((o) => !o)}
                    aria-label="Мени"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </header>

            {/* Mobile dropdown */}
            <nav className={`nav-mobile-drawer ${menuOpen ? "open" : ""}`}>
                <Link to="/"             onClick={() => setMenuOpen(false)}>Почетна</Link>
                <Link to="/announcements" onClick={() => setMenuOpen(false)}>Соопштенија</Link>
                <Link to="/membership"   onClick={() => setMenuOpen(false)}>Членство</Link>
                <Link to="/register"        onClick={() => setMenuOpen(false)}>Пријава за настан</Link>
                <button className="btn-primary" onClick={() => setMenuOpen(false)}>Најава</button>
            </nav>
        </>
    );
}