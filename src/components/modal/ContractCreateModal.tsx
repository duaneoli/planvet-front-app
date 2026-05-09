import { UseContractService } from "@/hooks/planvet/UseContract";
import Modal from "@/components/modal/Modal";
import { dueDateConstant, paymentMethodConstant } from "@/constants";
import { DueDateType, PaymentMethodType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import {
  AlertTriangle,
  Calendar,
  CreditCard,
  FileText,
  Info,
  QrCode,
  ShieldCheck,
} from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const contractSchema = z
  .object({
    paymentMethod: z.enum(paymentMethodConstant, { message: "Selecione um método de pagamento" }),
    dueCycleDay: z.enum(dueDateConstant).optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod !== "CREDIT_CARD" && !data.dueCycleDay) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Selecione o dia de vencimento",
        path: ["dueCycleDay"],
      });
    }
  });

type ContractFormType = z.infer<typeof contractSchema>;

interface ContractCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  animalId: number;
  planId: number;
  animalName: string;
  onCreated?: () => void;
}

export function ContractCreateModal({
  isOpen,
  onClose,
  animalId,
  planId,
  animalName,
  onCreated,
}: ContractCreateModalProps) {
  const { mutateAsync: createContract } = UseContractService.useCreate();

  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContractFormType>({
    resolver: zodResolver(contractSchema),
    mode: "onChange",
  });

  const formData = watch();

  const showDueDateWarning = useMemo(() => {
    if (!formData.dueCycleDay) return false;
    const today = new Date();
    const currentDay = today.getDate();
    const selectedDay = Number(formData.dueCycleDay);
    const diffDays =
      selectedDay >= currentDay
        ? selectedDay - currentDay
        : new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate() - currentDay + selectedDay;
    return diffDays > 15;
  }, [formData.dueCycleDay]);

  const onSubmit = async (data: ContractFormType) => {
    try {
      const dueCycleDay = data.dueCycleDay
        ? (Number(data.dueCycleDay) as 1 | 5 | 10 | 15 | 20 | 25)
        : (new Date().getDate() as 1 | 5 | 10 | 15 | 20 | 25);

      await createContract({
        animalId,
        planId,
        paymentMethod: data.paymentMethod,
        dueCycleDay,
      });
      toast.success("Contrato criado com sucesso!");
      reset();
      onClose();
      onCreated?.();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError.response?.data?.message ?? "Erro ao criar contrato. Tente novamente.");
    }
  };

  const paymentIcons: Record<PaymentMethodType, React.ReactNode> = {
    CREDIT_CARD: <CreditCard size={28} />,
    PIX: <QrCode size={28} />,
    BOLETO: <FileText size={28} />,
  };

  const paymentLabels: Record<PaymentMethodType, string> = {
    CREDIT_CARD: "Cartão",
    PIX: "PIX",
    BOLETO: "Boleto",
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Contratar Plano">
      <div className="w-full min-w-[320px] sm:min-w-130">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Resumo do plano */}
          <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-2xl shadow-sm text-emerald-600">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest leading-none mb-1">
                  Assinatura Mensal
                </p>
                <p className="text-sm font-bold text-emerald-950">
                  Proteção para {animalName.split(" ")[0]}
                </p>
                <p className="text-[9px] font-bold text-emerald-700 uppercase tracking-widest mt-0.5">
                  *contrato anual
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-black text-emerald-700 leading-none">R$ 89,90</p>
              <p className="text-[10px] font-bold text-emerald-600 mt-1 uppercase tracking-tighter">
                Por Mês
              </p>
            </div>
          </div>

          {/* Método de pagamento */}
          <div>
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-3">
              Forma de pagamento
            </p>
            <div className="grid grid-cols-3 gap-3">
              {paymentMethodConstant.map((method) => (
                <div key={method}>
                  <input
                    type="radio"
                    id={`method-${method}`}
                    value={method}
                    className="hidden"
                    {...register("paymentMethod")}
                  />
                  <label
                    htmlFor={`method-${method}`}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                      formData.paymentMethod === method
                        ? "border-azul-600 bg-azul-50 text-azul-700 shadow-md -translate-y-0.5"
                        : "border-slate-100 bg-white text-slate-400 hover:border-slate-200"
                    }`}
                  >
                    {paymentIcons[method]}
                    <span className="text-[11px] font-black mt-2 uppercase tracking-tight">
                      {paymentLabels[method]}
                    </span>
                  </label>
                </div>
              ))}
            </div>
            {errors.paymentMethod && (
              <p className="text-rose-500 text-xs font-medium mt-2">{errors.paymentMethod.message}</p>
            )}
          </div>

          {/* Dia de vencimento — apenas para BOLETO e PIX */}
          {(formData.paymentMethod === "BOLETO" || formData.paymentMethod === "PIX") && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center gap-2">
                <Calendar size={14} className="text-emerald-600" /> Dia de vencimento
              </p>
              <div className="grid grid-cols-3 gap-2">
                {dueDateConstant.map((d) => (
                  <div key={d}>
                    <input
                      type="radio"
                      id={`due-${d}`}
                      value={d}
                      className="hidden"
                      {...register("dueCycleDay")}
                    />
                    <label
                      htmlFor={`due-${d}`}
                      className={`block py-3 rounded-2xl text-xs font-bold border-2 cursor-pointer transition-all text-center ${
                        formData.dueCycleDay === d
                          ? "bg-azul-600 text-white border-azul-600 shadow-md scale-105"
                          : "bg-white text-slate-600 border-slate-200 hover:border-azul-300"
                      }`}
                    >
                      Dia {d}
                    </label>
                  </div>
                ))}
              </div>
              {errors.dueCycleDay && (
                <p className="text-rose-500 text-xs font-medium">{errors.dueCycleDay.message}</p>
              )}

              {showDueDateWarning && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex gap-3 animate-in fade-in duration-300">
                  <div className="bg-amber-100 p-1.5 h-fit rounded-lg text-amber-600">
                    <AlertTriangle size={16} />
                  </div>
                  <p className="text-[11px] text-amber-700 leading-relaxed font-medium">
                    Vencimento superior a 15 dias. Podem ser geradas{" "}
                    <strong>duas cobranças</strong> neste mês calendário.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Info cartão */}
          {formData.paymentMethod === "CREDIT_CARD" && (
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-3 animate-in fade-in duration-300">
              <div className="bg-blue-100 p-1.5 rounded-lg text-blue-600 shrink-0">
                <Info size={16} />
              </div>
              <p className="text-xs text-blue-700 font-medium leading-relaxed">
                Cobrança mensal automática no cartão. A data de renovação será baseada no dia de hoje.
              </p>
            </div>
          )}

          {/* Ações */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-2xl border-2 border-slate-100 text-slate-500 font-bold hover:bg-slate-50 transition-all text-sm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 rounded-2xl bg-azul-600 hover:bg-azul-700 text-white font-bold transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            >
              {isSubmitting ? "Criando..." : "Contratar Agora"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
