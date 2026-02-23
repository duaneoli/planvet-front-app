import Button from "@/components/Button";
import Input from "@/components/OldInput";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  Hash,
  KeyRound,
  Lock,
  Mail,
  ShieldCheck,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";

const passwordSchema = z
  .object({
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

type PasswordForm = z.infer<typeof passwordSchema>;

function StepPassword({
  onResetPassword,
}: {
  onResetPassword: (data: PasswordForm) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
  });

  const newPassword = watch("password", "");

  const requirements = [
    { label: "8+ caracteres", met: newPassword.length >= 8 },
    { label: "Letra Maiúscula", met: /[A-Z]/.test(newPassword) },
    { label: "Letra Minúscula", met: /[a-z]/.test(newPassword) },
    { label: "Número", met: /[0-9]/.test(newPassword) },
    { label: "Símbolo (!@#$)", met: /[^A-Za-z0-9]/.test(newPassword) },
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4">
      <div className="text-center">
        <div className="bg-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200 mx-auto mb-4">
          <ShieldCheck size={32} />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Nova Senha Forte</h1>
        <p className="text-slate-500 text-sm mt-2">
          Crie uma combinação ultra-segura para seu acesso.
        </p>
      </div>

      <form onSubmit={handleSubmit(onResetPassword)} className="space-y-4">
        <Input
          label="Nova Senha"
          type="password"
          placeholder="••••••••"
          icon={<Lock size={18} />}
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 grid grid-cols-2 gap-y-2">
          {requirements.map((req, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-tight ${req.met ? "text-emerald-600" : "text-slate-400"}`}
            >
              {req.met ? <Check size={12} strokeWidth={4} /> : <X size={12} strokeWidth={4} />}
              {req.label}
            </div>
          ))}
        </div>

        <Input
          label="Confirmar Nova Senha"
          type="password"
          placeholder="••••••••"
          icon={<Lock size={18} />}
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Button isLoading={isSubmitting} type="submit" className="w-full py-4 text-lg">
          Redefinir Senha
        </Button>
      </form>
    </div>
  );
}

const emailSchema = z.object({
  email: z.string().email("Endereço de e-mail inválido"),
});
type EmailForm = z.infer<typeof emailSchema>;

function StepEmail({ onSendEmail }: { onSendEmail: (data: EmailForm) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    mode: "onChange",
  });

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4">
      <div className="text-center">
        <div className="bg-azul-100 w-16 h-16 rounded-2xl flex items-center justify-center text-azul-600 mx-auto mb-4">
          <Mail size={32} />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Recuperar Senha</h1>
        <p className="text-slate-500 text-sm mt-2">
          Enviaremos um código de segurança para o seu e-mail.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSendEmail)} className="space-y-4">
        <Input
          label="Seu e-mail cadastrado"
          placeholder="exemplo@email.com"
          icon={<Mail size={18} />}
          {...register("email")}
          error={errors.email?.message}
          required
        />
        <Button type="submit" className="w-full py-4 text-lg" icon={<ArrowRight size={20} />}>
          Enviar Código
        </Button>
      </form>
    </div>
  );
}

const codeSchema = z.object({
  code: z
    .string()
    .length(6, "O código deve ter exatamente 6 dígitos")
    .regex(/^\d+$/, "O código deve conter apenas números"),
});
type CodeForm = z.infer<typeof codeSchema>;

function StepCode({ onSendCode, email }: { onSendCode: (data: CodeForm) => void; email: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CodeForm>({
    resolver: zodResolver(codeSchema),
    mode: "onChange",
  });

  const handleVerifyCodeSubmit = (data: CodeForm): void => {
    onSendCode(data);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4">
      <div className="text-center">
        <div className="bg-emerald-50 w-16 h-16 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-4">
          <KeyRound size={32} />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Verifique seu e-mail</h1>
        <p className="text-slate-500 text-sm mt-2">
          Insira o código de 6 dígitos enviado para <br />
          <span className="font-bold text-slate-700">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit(handleVerifyCodeSubmit)} className="space-y-6">
        <div className="space-y-1">
          <Input
            label="Código de Verificação"
            placeholder="000000"
            icon={<Hash size={18} />}
            inputMode="numeric"
            pattern="\d*"
            maxLength={6}
            {...register("code")}
            error={errors.code?.message}
            className="text-center text-2xl tracking-[0.5em] font-bold py-4"
            autoFocus
          />
        </div>

        <Button type="submit" className="w-full py-4 text-lg">
          Verificar Código
        </Button>

        <p className="text-center text-xs text-slate-400 font-medium">
          Não recebeu?{" "}
          <button
            type="button"
            onClick={() => alert("Código reenviado!")}
            className="text-emerald-600 font-bold hover:underline"
          >
            Reenviar código
          </button>
        </p>
      </form>
    </div>
  );
}

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const onResetPassword = async (data: PasswordForm) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert("Senha alterada com sucesso!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Link
          to="/login"
          className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-azul-600 mb-6 transition-colors group"
        >
          <ChevronLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" />
          Voltar para o Login
        </Link>

        <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100">
          {step === 1 && (
            <StepEmail
              onSendEmail={(e) => {
                setEmail(e.email);
                setStep(2);
              }}
            />
          )}

          {step === 2 && <StepCode onSendCode={(e) => {}} email={email} />}
          {step === 3 && <StepPassword onResetPassword={onResetPassword} />}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
