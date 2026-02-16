import { Input } from "@/components/DataInput/Input";
import { Form } from "@/components/form";
import { maskCPF } from "@/hooks/mask";
import { zodResolver } from "@hookform/resolvers/zod";
import { cpf } from "cpf-cnpj-validator";
import { ArrowRight, Fingerprint, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

const StepOneFormType = z.object({
  fullName: z.string().min(3, "Nome muito curto"),
  email: z.string().email("E-mail inválido"),
  cpf: z.string().refine((c) => cpf.isValid(c), {
    message: "CPF inválido",
  }),
});

type StepOneFormType = z.infer<typeof StepOneFormType>;

export function StepOne(props: {
  onNext: (data: StepOneFormType) => void;
  defaultValues?: Partial<StepOneFormType>;
}) {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StepOneFormType>({
    resolver: zodResolver(StepOneFormType),
    mode: "onChange",
    defaultValues: props.defaultValues || {
      cpf: "",
    },
  });

  const formData = watch();

  return (
    <Form
      handleSubmit={handleSubmit(props.onNext)}
      rigthButton={{
        isLoading: isSubmitting,
        text: "Próximo Passo",
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
        value={formData.cpf}
        {...register("cpf", {
          onChange: (e) => {
            const masked = maskCPF(e.target.value);
            setValue("cpf", masked);
          },
        })}
      />
    </Form>
  );
}
