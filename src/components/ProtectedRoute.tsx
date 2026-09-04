import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const { user, loading } = useAuth();
    if (loading) {
        return <div> Loading User</div>
    }
    if (!user) {
        return <Navigate to="/" />
    }
    return children
}