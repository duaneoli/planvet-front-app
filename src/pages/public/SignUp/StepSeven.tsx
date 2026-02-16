import Button from "@/components/Button";
import { Form } from "@/components/form";
import Input from "@/components/OldInput";
import { maskCreditCard } from "@/hooks/mask";
import { PaymentMethodType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronLeft, Copy, CreditCard, Lock, ShieldCheck, View } from "lucide-react";
import React, { useState } from "react";
import Barcode from "react-barcode";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useForm } from "react-hook-form";
import QRCode from "react-qr-code";
import z from "zod";

const signUpSchema = z.object({
  brand: z.string().min(3, "Rua muito curta"),
  cardNumber: z.string().min(3, "Rua muito curta"),
  name: z.string().min(3, "Rua muito curta"),
  expiry: z.string().min(3, "Rua muito curta"),
  cvv: z.string().min(3, "Rua muito curta"),
});

type SignUpForm = z.infer<typeof signUpSchema>;

export function StepSeven(props: {
  onPrevious: () => void;
  onNext: () => void;
  paymentMethod: PaymentMethodType | undefined;
}) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType | undefined>(
    props.paymentMethod
  );
  const [isSaving, setIsSaving] = useState(false);
  const [inFocus, setInFocus] = useState<"number" | "name" | "expiry" | "cvc" | undefined>(
    undefined
  );
  const submit = (e: any) => {
    setIsSaving(true);
    // Simulando salvamento
    setTimeout(() => {
      alert("Processo finalizado! Redirecionando para o dashboard...");
      setIsSaving(false);
      props.onNext();
    }, 1000);
  };

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

  const handlePayment = () => {
    if (paymentMethod === "Boleto") props.onNext();
    else if (paymentMethod === "PIX") {
      //AWAIT CONFIRMACAO DO BACK-END
      props.onNext();
    } else if (paymentMethod === "Cartão") {
    } else {
      console.log(`Payment Method: ${paymentMethod} not alowed`);
    }
  };

  return (
    <React.Fragment>
      {paymentMethod === "Cartão" && (
        <Form
          handleSubmit={handleSubmit(submit)}
          leftButton={{
            text: "Voltar",
            iconLeft: <ChevronLeft size={20} />,
            onClick: props.onPrevious,
            isLoading: isSaving,
          }}
          rigthButton={{
            text: "Ativar proteção",
            iconLeft: <ShieldCheck size={20} />,
            iconRight: <ShieldCheck size={20} />,
            isLoading: isSaving,
          }}
        >
          <Cards
            number={formData.cardNumber}
            expiry={formData.expiry}
            cvc={formData.cvv}
            name={formData.name}
            focused={inFocus}
          />

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
              Seus dados são criptografados e armazenados com segurança padrão PCI-DSS. Nós não
              temos acesso ao número completo do seu cartão.
            </p>
          </div>
        </Form>
      )}
      {paymentMethod === "Boleto" && (
        <div className="flex flex-col gap-5">
          <div className="flex justify-between">
            <span>Codigo de Barra do boleto</span>
            <span>Valor: 10,50</span>
          </div>
          <div className="flex justify-center">
            <Barcode value="1912921 9129312939109 93019 2391901930" width={1.5} />
          </div>
          <div className="flex justify-between">
            <Button icon={<View />}>Visualizar boleto</Button>
            <Button variant="secondary" onClick={() => setPaymentMethod("PIX")}>
              Pagar com PIX
            </Button>
            <Button icon={<Check />} onClick={handlePayment}>
              Confirmar pagamento
            </Button>
          </div>
        </div>
      )}
      {paymentMethod === "PIX" && (
        <div className="flex flex-col gap-5">
          <div className="flex justify-between">
            <span>Qr code, para pagamento</span>
            <span>Valor: 10,50</span>
          </div>
          <div className="flex justify-center">
            <QRCode value="https://planvet.com.br/dashboard" size={300} className="mx-auto" />
          </div>
          <div className="flex justify-between">
            <Button variant="secondary" icon={<Copy />}>
              Pix copia e cola
            </Button>
            <Button icon={<Check />} onClick={handlePayment}>
              Confirmar pagamento
            </Button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
