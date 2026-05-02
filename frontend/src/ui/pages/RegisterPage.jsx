import AuthCard from "../components/auth/AuthCard.jsx";

export default function RegisterPage() {
    return (
        <AuthCard
            title="Регистрација"
            subtitle="Апликација за членство"
        >
            <form className="flex flex-col gap-3 text-left">
                <input placeholder="Име" className="input" />
                <input placeholder="Презиме" className="input" />
                <input placeholder="Email" className="input" />

                <button className="btn-primary mt-2">
                    Испрати
                </button>
            </form>
        </AuthCard>
    );
}