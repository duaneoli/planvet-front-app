import Button from "@/components/Button";
import { PaymentByCard } from "@/components/Payments/PaymentByCard";
import { PaymentByPix } from "@/components/Payments/PaymentByPix";
import { PaymentMethodType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, View } from "lucide-react";
import React, { useState } from "react";
import Barcode from "react-barcode";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useForm } from "react-hook-form";
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

  const { watch } = useForm<SignUpForm>({
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
    if (paymentMethod === "BOLETO") props.onNext();
    else if (paymentMethod === "PIX") {
      //AWAIT CONFIRMACAO DO BACK-END
      props.onNext();
    } else if (paymentMethod === "CARD") {
    } else {
      console.log(`Payment Method: ${paymentMethod} not alowed`);
    }
  };

  return (
    <React.Fragment>
      {paymentMethod === "CARD" && (
        <PaymentByCard
          cardNumber={formData.cardNumber}
          expiry={formData.expiry}
          cvv={formData.cvv}
          name={formData.name}
          inFocus={"cvc"}
        />
      )}
      {paymentMethod === "BOLETO" && (
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
      {paymentMethod === "PIX" && <PaymentByPix />}
    </React.Fragment>
  );
}
