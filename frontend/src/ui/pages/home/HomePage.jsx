import {Link} from "react-router";
import "./HomePage.css";
import doctorsImage from "../../../assets/doctors.png";
export default function HomePage() {
    const isAuthenticated = !!localStorage.getItem("token");

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
                        {!isAuthenticated ? (
                            <Link to="/register" className="btn primary">
                                Стани член
                            </Link>
                        ) : (
                            <p className="home-welcome">Добредојде!</p>
                        )}
                    </div>
                </div>

                <div className="home-hero__image">
                    <img
                        src={doctorsImage}
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

            {!isAuthenticated && (
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
            )}

        </div>


    );
}