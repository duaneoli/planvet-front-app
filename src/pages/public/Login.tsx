import Button from "@/components/Button";
import Input from "@/components/OldInput";
import { useAuth } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ChevronRight, Dog, Lock, Mail } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Credenciais inválidas ou erro no servidor.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-red-500 p-3 rounded-2xl text-white shadow-xl shadow-red-200 mb-4 animate-bounce">
            <Dog size={32} />
          </div>
          <h1 className="text-3xl font-bold text-azul-500">PlanVet</h1>
          <p className="text-azul-500 mt-2">Bem-vindo à maior rede de proteção pet.</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 shadow-slate-200/50">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="E-mail"
              placeholder="exemplo@email.com"
              icon={<Mail size={18} />}
              error={errors.email?.message}
              {...register("email")}
            />

            <div className="space-y-1">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-tight ml-1">
                  Senha
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-azul-500 hover:text-azul-700 hover:underline cursor-pointer"
                >
                  Esqueci a senha
                </Link>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                icon={<Lock size={18} />}
                error={errors.password?.message}
                {...register("password")}
              />
            </div>

            <Button
              isLoading={isSubmitting}
              type="submit"
              variant="primary"
              className="w-full text-lg py-4 rounded-2xl"
            >
              <span>Entrar</span>
              <ChevronRight size={20} className="ml-2" />
            </Button>
          </form>
          <div className="mt-8 pt-8 border-t border-slate-50 text-center">
            <p className="text-slate-500">Não tem uma conta?</p>
            <Link
              to="/signup"
              className="text-azul-600 font-bold hover:underline mt-1 inline-block"
            >
              Criar conta gratuitamente
            </Link>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center space-x-2 text-slate-400">
          <AlertCircle size={14} />
          <p className="text-[10px] uppercase font-bold tracking-widest">
            Acesso seguro criptografado
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
