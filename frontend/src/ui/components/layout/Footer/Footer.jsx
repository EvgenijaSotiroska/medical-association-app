import { Link } from "react-router";
import "./Footer.css";

export default function Footer() {
    const isAuthenticated = !!localStorage.getItem("token");

    return (
        <footer className="footer">
            <div className="footer__grid">
                <div className="footer__col">
                    <h3>Здружение на интернисти</h3>
                    <p>
                        Професионално здружение основано со цел унапредување на интерната
                        медицина во Република Северна Македонија.
                    </p>
                </div>

                <div className="footer__col">
                    <h4>Брзи линкови</h4>
                    <ul>
                        <li><Link to="/">За здружението</Link></li>
                        {isAuthenticated && (
                            <>
                                <li><Link to="/announcements">Соопштенија</Link></li>
                                <li><Link to="/my-events">Мои настани</Link></li>
                                <li><Link to="/profile">Мој профил</Link></li>
                            </>
                        )}
                        {!isAuthenticated && (
                            <li><Link to="/register">Зачленување</Link></li>
                        )}
                    </ul>
                </div>

                <div className="footer__col">
                    <h4>Контакт</h4>
                    <p>ул. Водњанска 17, 1000 Скопје</p>
                    <p>medicalassociationgroup@gmail.com</p>
                    <p>+389 2 312 3456</p>
                </div>
            </div>

            <div className="footer__bottom">
                © 2026 Здружение на интернисти на РСМ. Сите права задржани.
            </div>
        </footer>
    );
}