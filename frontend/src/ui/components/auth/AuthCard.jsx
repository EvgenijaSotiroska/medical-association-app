export default function AuthCard({ title, subtitle, children }) {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh"
        }}>
            <div className="auth-card">
                <div style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: "#0b2a5b",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 10px"
                }}>
                    ЗИ
                </div>

                <h2 style={{ marginBottom: 5 }}>{title}</h2>
                <p style={{ color: "#6b7280", marginBottom: 20 }}>{subtitle}</p>

                {children}
            </div>
        </div>
    );
}