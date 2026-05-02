import { Link } from "react-router";
import './Header.css';

export default function Header() {
    return (
        <header className="navbar">
            <div className="navbar-brand">
                Здружение на интернисти
            </div>

            <nav className="nav-links">
                <Link to="/">Почетна</Link>
                <Link to="/announcements">Соопштенија</Link>
                <Link to="/about">За здружението</Link>
                <Link to="/membership">Членство</Link>
                <Link to="/apply">Пријава за настан</Link>
                <Link to="/admin">Админ</Link>
            </nav>

            <button className="btn-primary">
                Најава
            </button>
        </header>
    );
}