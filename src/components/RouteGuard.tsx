import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface RouteGuardProps {
  element: React.ReactElement;
  isPrivate: boolean;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ element, isPrivate }) => {
  const { isAuthenticated, isValidated, isLoading, verifySession } = useAuth();

  // Dispara a validação apenas se for uma rota privada e ainda não tiver sido validada
  useEffect(() => {
    if (isPrivate && isAuthenticated && !isValidated) {
      verifySession();
    }
  }, [isPrivate, isAuthenticated, isValidated, verifySession]);

  // Se a rota for PÚBLICA, devolvemos o elemento NA HORA.
  // Não esperamos validação de servidor para páginas de Login ou Cadastro.
  if (!isPrivate) {
    // Opcional: Se já estiver logado e validado, redireciona para home
    if (isAuthenticated && isValidated) {
      return <Navigate to="/" replace />;
    }
    return element;
  }

  // --- Lógica para Rota PRIVADA ---

  // 1. Não tem nem rastro de usuário no localStorage? Login direto.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2. Tem usuário mas ainda está validando com o servidor? Loader.
  if (!isValidated || isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
          <Loader2 className="animate-spin text-emerald-600 mx-auto" size={48} />
          <p className="text-slate-500 font-medium animate-pulse">Verificando sua sessão...</p>
        </div>
      </div>
    );
  }

  // 3. Autenticado e validado pelo servidor.
  return element;
};

export default RouteGuard;
