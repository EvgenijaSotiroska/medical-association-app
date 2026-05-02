export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {children}
        </div>
    );
}