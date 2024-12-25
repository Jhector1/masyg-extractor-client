// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
//import { useAuth } from "../context";

interface ProtectedRouteProps {
    // isAuthenticated: boolean;
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
   // const { state } = useAuth();

    //alert(state.isAuthenticated);
    const currentUser = sessionStorage.getItem('user') || localStorage.getItem('user');
    if (!currentUser || currentUser==='undefined') {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;
