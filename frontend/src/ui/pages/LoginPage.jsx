import AuthCard from "../components/auth/AuthCard.jsx";
import { Link } from "react-router";

export default function LoginPage() {
    return (
        <AuthCard
            title="Најава"
            subtitle="за членови и администратори"
        >
            <form className="flex flex-col gap-4 text-left">

                <div>
                    <label className="text-sm font-small">Email</label>
                    <input
                        placeholder="Внеси email"
                        className="input"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Лозинка</label>
                    <input
                        type="password"
                        placeholder="Внеси лозинка"
                        className="input"
                    />
                </div>

                <button className="btn-primary w-full mt-2">
                    Најави се
                </button>

                <p className="text-sm text-center text-gray-600 mt-2">
                    Нов член?{" "}
                    <Link
                        to="/register"
                        style={{ color: "#0b2a5b", fontWeight: 500 }}
                    >
                        Аплицирај за членство
                    </Link>
                </p>

            </form>
        </AuthCard>
    );
}