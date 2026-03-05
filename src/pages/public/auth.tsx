import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

export function Auth() {
  const { loginPHP, isLoading } = useAuth();
  const token = new URLSearchParams(window.location.search).get("token");

  const fetch = async () => {
    if (token) {
      try {
        await loginPHP(token);
        window.location.replace("/");
      } catch (error) {
        toast.error("Error ao realizar o login, token invalido.");
      }
    }
  };

  useEffect(() => {
    fetch();
  }, [token]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-emerald-600" size={48} />
      </div>
    );
  }
}
