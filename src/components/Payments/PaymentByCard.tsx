import { InvoiceResponseDTO } from "@/api/planvet/dto/response/InvoiceResponseDTO";
import { UsePaymentService } from "@/api/planvet/use/UsePayment";
import { Form } from "@/components/DataInput/Form";
import { Input } from "@/components/DataInput/Input";
import { maskCreditCard } from "@/hooks/mask";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, Lock, ShieldCheck } from "lucide-react";
import { useState } from "react";
import Cards from "react-credit-cards-2";
import { useForm } from "react-hook-form";
import z from "zod";

type PaymentByCardProps = {
  show?: boolean;
  invoice: InvoiceResponseDTO;
};

const signUpSchema = z.object({
  brand: z.string().min(3, "Rua muito curta"),
  cardNumber: z.string().min(3, "Rua muito curta"),
  name: z.string().min(3, "Rua muito curta"),
  expiry: z.string().min(3, "Rua muito curta"),
  cvv: z.string().min(3, "Rua muito curta"),
});

type SignUpForm = z.infer<typeof signUpSchema>;

export function PaymentByCard(props: PaymentByCardProps) {
  const [inFocus, setInFocus] = useState<"number" | "name" | "expiry" | "cvc" | undefined>(
    undefined
  );

  const {
    watch,
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      brand: "Visa",
      cardNumber: "4111 1111 1111 1111",
      name: "DUANE SILVA",
      expiry: "12/25",
      cvv: "123",
    },
  });

  let formData = watch();

  const { mutate, isPending } = UsePaymentService.user.createCharge();
  const handlePayment = async (data: SignUpForm) => {
    try {
      mutate({ invoiceId: props.invoice.id, data: { paymentMethod: props.invoice.paymentMethod } });
    } catch (error) {}
  };

  return (
    <div className="flex flex-col gap-5 max-w-[500px]">
      <Cards
        number={formData.cardNumber}
        expiry={formData.expiry}
        cvc={formData.cvv}
        name={formData.name}
        focused={inFocus}
      />
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
            {...register("name")}
            onFocus={() => setInFocus("name")}
            error={errors.name?.message}
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
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Validade"
              placeholder="MM/AA"
              {...register("expiry")}
              onFocus={() => setInFocus("expiry")}
              error={errors.expiry?.message}
            />
            <Input
              label="CVV"
              placeholder="123"
              icon={<Lock size={16} />}
              {...register("cvv")}
              onFocus={() => setInFocus("cvc")}
              error={errors.cvv?.message}
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
