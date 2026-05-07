import {Link} from "react-router";
import "./HomePage.css";

export default function HomePage() {
    return (
        <div className="home-page">

            <section className="home-hero">

                <div className="home-hero__content">
                    <span className="home-hero__est">Est. 1957</span>

                    <h1>
                        Знаење, етика и грижа<br/>
                        во интерната медицина
                    </h1>

                    <p>
                        Здружението на интернисти на Република Северна Македонија ги обединува
                        специјалистите по интерна медицина и нивните под-специјалности со цел
                        постојано стручно усовршување.
                    </p>

                    <div className="home-hero__actions">
                        <Link to="/register" className="btn primary">Стани член</Link>

                    </div>
                </div>

                <div className="home-hero__image">
                    <img
                        src="https://img.freepik.com/free-photo/team-young-specialist-doctors-standing-corridor-hospital_1303-21199.jpg"
                        alt="Doctors"
                    />
                </div>

            </section>

            <section className="home-page__section">
                <div className="home-page__grid">

                    <div className="home-card">
                        <h3>1.200+</h3>
                        <p>активни членови низ цела држава</p>
                    </div>

                    <div className="home-card">
                        <h3>Настани</h3>
                        <p>конгреси, семинари и работилници</p>
                    </div>

                    <div className="home-card">
                        <h3>Документи</h3>
                        <p>протоколи и водичи за пракса</p>
                    </div>

                </div>
            </section>

            <section className="home-page__section">
                <div className="home-cta">

                    <h2>Членство</h2>
                    <p>
                        Зачленете се за пристап до едукативни ресурси и КМЕ кредити.
                    </p>

                    <Link to="/register" className="btn primary">
                        Аплицирај
                    </Link>
                </div>
            </section>

            <footer className="home-footer">

                <div className="home-footer__grid">

                    <div className="home-footer__col">
                        <h3>Здружение на интернисти</h3>
                        <p>
                            Професионално здружение основано со цел унапредување на интерната
                            медицина во Република Северна Македонија.
                        </p>
                    </div>

                    <div className="home-footer__col">
                        <h4>Брзи линкови</h4>
                        <ul>
                            <li>За здружението</li>
                            <li>Соопштенија</li>
                            <li>Зачленување</li>
                            <li>Настани</li>
                            <li>Контакт</li>
                        </ul>
                    </div>

                    <div className="home-footer__col">
                        <h4>Контакт</h4>
                        <p>ул. Водњанска 17, 1000 Скопје</p>
                        <p>info@zdrintmkd.org</p>
                        <p>+389 2 312 3456</p>
                    </div>

                </div>

                <div className="home-footer__bottom">
                    © 2026 Здружение на интернисти на РСМ. Сите права задржани.
                </div>

            </footer>

        </div>


    );
}