import { AuthService } from "@/api/planvet/services/AuthService";
import { Card } from "@/components/Card";
import { Form } from "@/components/DataInput/Form";
import { Input } from "@/components/DataInput/Input";
import { Link } from "@/components/Link";
import { useAuth } from "@/context/AuthContext";
import { maskCPF } from "@/hooks/mask";
import { zodResolver } from "@hookform/resolvers/zod";
import { cpf } from "cpf-cnpj-validator";
import { AxiosError } from "axios";
import {
  ArrowRight,
  Check,
  Dog,
  Fingerprint,
  Lock,
  Mail,
  Sparkles,
  User,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";

const signUpSchema = z
  .object({
    fullName: z.string().min(3, "Nome muito curto"),
    email: z.string().email("E-mail inválido"),
    cpf: z.string().refine((c) => cpf.isValid(c), { message: "CPF inválido" }),
    password: z
      .string()
      .min(8, "Mínimo de 8 caracteres")
      .regex(/[A-Z]/, "Deve conter uma letra maiúscula")
      .regex(/[a-z]/, "Deve conter uma letra minúscula")
      .regex(/[0-9]/, "Deve conter um número")
      .regex(/[^A-Za-z0-9]/, "Deve conter um símbolo (!@#$%^&*)"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type SignUpFormType = z.infer<typeof signUpSchema>;

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { refreshSession } = useAuth();
  const [done, setDone] = useState(false);

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormType>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: { cpf: "" },
  });

  const password = watch("password", "");
  const formCpf = watch("cpf");

  const passwordRequirements = [
    { label: "8+ caracteres", met: password.length >= 8 },
    { label: "Letra Maiúscula", met: /[A-Z]/.test(password) },
    { label: "Letra Minúscula", met: /[a-z]/.test(password) },
    { label: "Número", met: /[0-9]/.test(password) },
    { label: "Símbolo (!@#$)", met: /[^A-Za-z0-9]/.test(password) },
  ];

  const onSubmit = async (data: SignUpFormType) => {
    try {
      await AuthService.register({
        fullName: data.fullName,
        email: data.email,
        cpf: data.cpf,
        password: data.password,
      });
      await refreshSession();
      setDone(true);
      setTimeout(() => navigate("/animals?create=true"), 3000);
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError.response?.data?.message ?? "Erro ao criar conta. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3">
            <div className="bg-azul-600 p-2.5 rounded-2xl text-white shadow-xl rotate-3">
              <Dog size={28} />
            </div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">PlanVet</h2>
          </div>
        </div>

        <Card>
          {!done ? (
            <Form
              handleSubmit={handleSubmit(onSubmit)}
              rigthButton={{
                isLoading: isSubmitting,
                text: "Criar conta",
                iconRight: <ArrowRight size={20} />,
              }}
            >
              <div className="text-center mb-4">
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Crie sua conta</h1>
                <p className="text-slate-500 text-sm">Insira seus dados para começar a proteção.</p>
              </div>

              <Input
                label="Nome Completo"
                icon={<User size={18} />}
                placeholder="Nome e sobrenome"
                error={errors.fullName?.message}
                {...register("fullName")}
              />

              <Input
                label="E-mail"
                type="email"
                icon={<Mail size={18} />}
                placeholder="seu@email.com"
                error={errors.email?.message}
                {...register("email")}
              />

              <Input
                label="CPF"
                icon={<Fingerprint size={18} />}
                placeholder="000.000.000-00"
                error={errors.cpf?.message}
                value={formCpf}
                {...register("cpf", {
                  onChange: (e) => setValue("cpf", maskCPF(e.target.value)),
                })}
              />

              <Input
                label="Senha"
                type="password"
                placeholder="••••••••"
                icon={<Lock size={18} />}
                error={errors.password?.message}
                {...register("password")}
              />

              {password.length > 0 && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 grid grid-cols-2 gap-y-2">
                  {passwordRequirements.map((req, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-tight ${req.met ? "text-emerald-600" : "text-slate-400"}`}
                    >
                      {req.met ? <Check size={12} strokeWidth={4} /> : <X size={12} strokeWidth={4} />}
                      {req.label}
                    </div>
                  ))}
                </div>
              )}

              <Input
                label="Confirmar Senha"
                type="password"
                placeholder="••••••••"
                icon={<Lock size={18} />}
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />
            </Form>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-8 py-12 animate-in zoom-in duration-700 text-center">
              <div className="relative">
                <div className="w-28 h-28 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-emerald-200 z-10 relative">
                  <Check size={64} strokeWidth={4} className="animate-in zoom-in duration-500 delay-200" />
                </div>
                <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-25 -z-10"></div>
                <div className="absolute inset-2.5 bg-emerald-100 rounded-full animate-pulse -z-20"></div>
              </div>

              <div className="space-y-2">
                <h2 className="text-4xl font-black text-slate-800 tracking-tighter">BEM-VINDO!</h2>
                <p className="text-slate-500 font-medium">Sua conta foi criada com sucesso.</p>
              </div>

              <div className="bg-emerald-50 px-6 py-3 rounded-2xl flex items-center gap-3 text-emerald-700 font-bold border border-emerald-100">
                <Sparkles size={20} className="text-amber-500 animate-spin" />
                <span>Redirecionando para seus animais...</span>
              </div>
            </div>
          )}
        </Card>

        {!done && (
          <div className="mt-8 text-center">
            <div className="pt-6 border-slate-200">
              <p className="text-sm text-slate-600 font-medium">
                Já possui uma conta? <Link to="/login">ENTRAR AGORA</Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
