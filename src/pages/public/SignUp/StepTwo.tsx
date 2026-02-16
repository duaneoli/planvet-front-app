import { Input } from "@/components/DataInput/Input";
import { Form } from "@/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, ChevronLeft, Lock, ShieldCheck, X } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

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

type PasswordFormType = z.infer<typeof passwordSchema>;

export function StepTwo(props: {
  onNext: (data: PasswordFormType) => void;
  onPrevious: () => void;
  defaultValues?: Partial<PasswordFormType>;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormType>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
    defaultValues: props.defaultValues,
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
    <Form
      handleSubmit={handleSubmit(props.onNext)}
      rigthButton={{
        isLoading: isSubmitting,
        text: "Próximo Passo",
        iconRight: <ArrowRight size={20} />,
      }}
      leftButton={{
        text: "Voltar",
        iconLeft: <ChevronLeft size={20} />,
        onClick: props.onPrevious,
      }}
    >
      <div className="space-y-6 animate-in slide-in-from-right-4">
        <div className="text-center">
          <div className="bg-azul-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-azul-200 mx-auto mb-4">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Nova Senha Forte</h1>
          <p className="text-slate-500 text-sm mt-2">
            Crie uma combinação ultra-segura para seu acesso.
          </p>
        </div>

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
      </div>
    </Form>
  );
}
