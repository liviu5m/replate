import React from "react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../lib/AppContext";

interface NonAuthRequiredRouteProps {
  children: ReactNode;
}

const NonAuthRequiredRoute: React.FC<NonAuthRequiredRouteProps> = ({ children }) => {
  const location = useLocation();
  const {token} = useAppContext();
  if (token && location.pathname.startsWith("/auth")) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default NonAuthRequiredRoute;
