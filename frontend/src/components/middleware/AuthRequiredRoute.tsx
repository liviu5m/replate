import React from "react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../lib/AppContext";

interface AuthRequiredRouteProps {
  children: ReactNode;
}

const AuthRequiredRoute: React.FC<AuthRequiredRouteProps> = ({ children }) => {
  const location = useLocation();
  const {token} = useAppContext();
  if (!token && !location.pathname.startsWith("/auth")) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};

export default AuthRequiredRoute;
