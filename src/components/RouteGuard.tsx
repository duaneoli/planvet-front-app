import { Loader } from "@/components/Loader";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface RouteGuardProps {
  element: React.ReactElement;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ element }) => {
  const { isAuthenticated, isValidated, isLoading, verifySession } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && !isValidated) {
      verifySession();
    }
  }, [isAuthenticated, isValidated]);

  if (!isAuthenticated && isValidated) {
    return <Navigate to="/login" replace />;
  }

  if (!isValidated || isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader message="Verificando sua sessão..." />
      </div>
    );
  }

  return element;
};

export default RouteGuard;
