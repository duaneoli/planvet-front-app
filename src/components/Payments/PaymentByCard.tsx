import { InvoiceResponseDTO } from "@/api/planvet/dto/response/InvoiceResponseDTO";
import { UsePaymentService } from "@/api/planvet/use/UsePayment";
import { UseUserService } from "@/api/planvet/use/UseUser";
import Button from "@/components/Button";
import { Form } from "@/components/DataInput/Form";
import { Input } from "@/components/DataInput/Input";
import { maskCreditCard, MaskExpirationCard } from "@/hooks/mask";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CreditCard, EditIcon, Lock, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import Cards from "react-credit-cards-2";
import { useForm } from "react-hook-form";
import z from "zod";
dayjs.extend(customParseFormat);

type PaymentByCardProps = {
  show?: boolean;
  invoice: InvoiceResponseDTO;
  change: (status: InvoiceResponseDTO["paymentMethod"] | "FINISHED") => void;
};

const signUpSchema = z.object({
  cardNumber: z
    .string({ message: "Número do cartão é obrigatório" })
    .transform((value) => value.replace(/\D/g, "")),
  cvv: z
    .string()
    .min(3, { message: "CVV é obrigatório, somente números" })
    .transform((value) => value.replace(/\D/g, "")),
  expiration: z
    .string()
    .nonempty("Validade é obrigatória formato MM/AA")
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Validade é obrigatória formato MM/AA" })
    .refine(
      (value) => dayjs(value, "MM/YY", true).isAfter(dayjs().startOf("month").subtract(1, "day")),
      "Insira uma data maior que hoje"
    ),
  holderName: z.string().nonempty("Nome no cartão é obrigatório"),
});

type SignUpForm = z.infer<typeof signUpSchema>;

export function PaymentByCard(props: PaymentByCardProps) {
  const [inFocus, setInFocus] = useState<"number" | "name" | "expiry" | "cvc" | undefined>(
    undefined
  );
  const [allowEdit, setAllowEdit] = useState(true);

  const {
    watch,
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  let formData = watch();

  const { data: card, isLoading } = UseUserService.user.card();

  const { mutate, isPending } = UsePaymentService.user.createCharge();
  const handlePayment = async (data: SignUpForm) => {
    try {
      mutate({
        invoiceId: props.invoice.id,
        data: {
          paymentMethod: props.invoice.paymentMethod,
          holderName: allowEdit ? data.holderName : undefined,
          cardNumber: allowEdit ? data.cardNumber : undefined,
          cvv: allowEdit ? data.cvv : undefined,
          expiration: allowEdit ? data.expiration : undefined,
        },
      });
      props.change("FINISHED");
    } catch (error) {}
  };

  useEffect(() => {
    if (!card) return;
    setValue("cardNumber", "**** **** **** " + card.numeroFinal);
    setValue("holderName", card.holderName);
    setValue("expiration", dayjs(card.expiration).format("MM/YY"));
    setValue("cvv", "***");
    setAllowEdit(false);
  }, [card]);

  return (
    <div className="flex flex-col gap-5 max-w-[500px]">
      <div className="relative">
        <span className="absolute w-full flex flex-row justify-end z-10">
          <Button
            variant="primary"
            size="sm"
            icon={<EditIcon />}
            onClick={() => setAllowEdit(true)}
          />
        </span>
        <Cards
          number={formData.cardNumber}
          expiry={formData.expiration || ""}
          cvc={formData.cvv}
          name={formData.holderName}
          focused={inFocus}
          preview={!allowEdit}
          placeholders={{ name: "Nome no Cartão" }}
          locale={{ valid: "Valido até" }}
          issuer={card?.bandeira}
        />
      </div>
      {props.show && (
        <div className="bg-blue-50 p-6 rounded-2xl text-center border border-blue-100 ">
          <p className="text-sm text-blue-700 font-medium">
            Esta fatura será cobrada automaticamente no seu cartão final{" "}
            <strong>
              {formData.cardNumber.length == 16 ? formData.cardNumber.slice(-4) : "****"}
            </strong>{" "}
            no dia do vencimento.
          </p>
        </div>
      )}
      <Form
        handleSubmit={handleSubmit(handlePayment)}
        rigthButton={{
          text: "Pagar",
          isLoading: false,
          disabled: isPending,
        }}
      >
        <div className="space-y-4">
          <Input
            label="Nome no Cartão"
            placeholder="Como impresso no cartão"
            {...register("holderName")}
            onFocus={() => setInFocus("name")}
            error={errors.holderName?.message}
            disabled={!allowEdit || isLoading}
          />

          <Input
            label="Número do Cartão"
            placeholder="0000 0000 0000 0000"
            icon={<CreditCard size={18} />}
            {...register("cardNumber")}
            onChange={(e) => {
              const mask = maskCreditCard(e.target.value);
              setValue("cardNumber", mask);
            }}
            onFocus={() => setInFocus("number")}
            error={errors.cardNumber?.message}
            disabled={!allowEdit || isLoading}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Validade"
              placeholder="MM/AA"
              {...register("expiration")}
              onFocus={() => setInFocus("expiry")}
              error={errors.expiration?.message}
              disabled={!allowEdit || isLoading}
              onChange={(e) => {
                const mask = MaskExpirationCard(e.target.value);
                setValue("expiration", mask);
              }}
            />
            <Input
              label="CVV"
              placeholder="123"
              icon={<Lock size={16} />}
              {...register("cvv")}
              onFocus={() => setInFocus("cvc")}
              error={errors.cvv?.message}
              disabled={!allowEdit || isLoading}
            />
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl flex gap-3 border border-blue-100">
          <ShieldCheck className="text-blue-500 shrink-0" size={18} />
          <p className="text-[10px] text-blue-700 leading-tight">
            Seus dados são criptografados e armazenados com segurança padrão PCI-DSS. Nós não temos
            acesso ao número completo do seu cartão.
          </p>
        </div>
      </Form>
    </div>
  );
}
