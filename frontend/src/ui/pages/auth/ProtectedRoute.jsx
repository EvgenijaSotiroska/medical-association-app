import { Navigate } from "react-router";
import {getUserRole} from "../../../utils/auth.js";


export default function ProtectedRoute({ children, requiredRole }) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/" replace />;
    }

    const role = getUserRole();

    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    return children;
}