import { Form } from "@/components/DataInput/Form";
import { dueDateConstant, paymentMethodConstant } from "@/constants";
import { DueDateType, PaymentMethodType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  BookmarkCheck,
  Calendar,
  CreditCard,
  FileText,
  Info,
  QrCode,
  ShieldCheck,
} from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const StepFourFormType = z
  .object({
    paymentMethod: z.enum(paymentMethodConstant, { message: "Selecione um método de pagamento" }),
    dueDate: z.enum(dueDateConstant).optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod !== "Cartão" && !data.dueDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Selecione o dia de vencimento da fatura",
        path: ["dueDate"], // O erro será atribuído ao campo dueDate
      });
    }
  });

type StepFourFormType = z.infer<typeof StepFourFormType>;

export function StepFour(props: {
  defaultValues: {
    petName: string;
    paymentMethod?: PaymentMethodType;
    dueDate?: DueDateType | null | undefined;
  };
  onNext: (data: {
    paymentMethod: PaymentMethodType;
    dueDate?: DueDateType | null | undefined;
  }) => void;
  onPrevious: (data: {
    paymentMethod: PaymentMethodType;
    dueDate?: DueDateType | null | undefined;
  }) => void;
}) {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StepFourFormType>({
    resolver: zodResolver(StepFourFormType),
    mode: "onChange",
    defaultValues: props.defaultValues,
  });

  const formData = watch();

  const showDueDateWarning = useMemo(() => {
    if (!formData.dueDate) return;
    const today = new Date();
    const currentDay = today.getDate();
    const selectedDay = Number(formData.dueDate);
    let diffDays = 0;
    if (selectedDay >= currentDay) {
      diffDays = selectedDay - currentDay;
    } else {
      const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
      diffDays = daysInMonth - currentDay + selectedDay;
    }
    return diffDays > 15;
  }, [formData.dueDate]);

  return (
    <div>
      <div className="text-center mb-2">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Forma de Pagamento</h1>
        <p className="text-slate-500 text-sm">Escolha como prefere pagar sua assinatura mensal.</p>
      </div>
      <Form
        handleSubmit={handleSubmit(props.onNext)}
        rigthButton={{
          text: "Criar Conta",
          iconRight: <BookmarkCheck size={20} />,
        }}
        leftButton={{
          text: "Voltar",
          onClick: () => {
            props.onPrevious(formData);
          },
        }}
      >
        <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-[2rem] flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-2xl shadow-sm text-emerald-600">
                <ShieldCheck size={28} />
              </div>
              <div>
                <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest leading-none mb-1">
                  Assinatura Mensal
                </p>
                <p className="text-base font-bold text-emerald-950">
                  Proteção para {props.defaultValues.petName.split(" ")[0]} e tranquilidade para
                  você.
                </p>
                <p className="text-[8px] font-black text-emerald-800 uppercase tracking-widest leading-none mb-1 mt-1">
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

          <div className="flex flex-col">
            <div className="grid grid-cols-3 gap-4">
              {paymentMethodConstant.map((method: PaymentMethodType) => (
                <>
                  <input
                    type="radio"
                    style={{ display: "none" }}
                    id={`${method}-radio`}
                    {...register("paymentMethod")}
                    value={method}
                  />
                  <label
                    key={method}
                    htmlFor={`${method}-radio`}
                    className={`flex flex-col items-center justify-center p-5 rounded-[2rem] border-2 transition-all duration-300 ${
                      formData.paymentMethod === method
                        ? "border-azul-600 bg-azul-50 text-azul-700 shadow-lg -translate-y-1"
                        : "border-slate-100 bg-white text-slate-400 hover:border-slate-200"
                    }`}
                  >
                    {method === "Cartão" ? (
                      <CreditCard size={28} />
                    ) : method === "PIX" ? (
                      <QrCode size={28} />
                    ) : (
                      <FileText size={28} />
                    )}
                    <span className="text-[11px] font-black mt-2 uppercase tracking-tighter">
                      {method}
                    </span>
                  </label>
                </>
              ))}
            </div>
            <span className="text-rose-500 font-medium mt-3">{errors.paymentMethod?.message}</span>
          </div>

          {["Pix", "Boleto"].includes(formData.paymentMethod) && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-4">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-600 uppercase flex items-center gap-2 px-1">
                    <Calendar size={16} className="text-emerald-600" /> Dia de vencimento
                    preferencial
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {dueDateConstant.map((d: any) => (
                      <>
                        <input
                          type="radio"
                          {...register("dueDate")}
                          value={d}
                          className="hidden"
                          id={"dueDate-radio" + d}
                        />
                        <label
                          htmlFor={"dueDate-radio" + d}
                          key={d}
                          className={`py-3 rounded-2xl text-xs font-bold border border-2 transition-all text-center ${
                            formData.dueDate === d
                              ? "bg-azul-600 text-white border-azul-600 shadow-md scale-105"
                              : "bg-white text-slate-600 border-slate-200 hover:border-azul-300"
                          }`}
                        >
                          Dia {d}
                        </label>
                      </>
                    ))}
                  </div>
                  <span className="w-full text-center text-rose-500 font-medium mt-3">
                    {errors.dueDate?.message}
                  </span>
                </div>
              </div>

              {showDueDateWarning && (
                <div className="p-5 bg-amber-50 border border-amber-200 rounded-[2rem] flex gap-4 animate-in slide-in-from-top-2 duration-300">
                  <div className="bg-amber-100 p-2 h-fit rounded-lg text-amber-600">
                    <AlertTriangle size={20} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-black text-amber-800 uppercase tracking-tight">
                      Atenção ao Vencimento
                    </p>
                    <p className="text-[11px] text-amber-700 leading-relaxed font-medium">
                      O vencimento escolhido é superior a 15 dias a partir de hoje. Devido ao ciclo
                      de faturamento, podem ser geradas <strong>duas cobranças</strong> neste mês
                      calendário.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {formData.paymentMethod === "Cartão" && (
            <div className="p-5 bg-blue-50 border border-blue-100 rounded-[2rem] flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <Info size={20} />
              </div>
              <p className="text-xs text-blue-700 font-medium leading-relaxed">
                Ao escolher cartão, a cobrança é feita mensalmente de forma automática. A data de
                renovação será baseada no dia de hoje.
              </p>
            </div>
          )}
        </div>
      </Form>
    </div>
  );
}
