import { InvoiceResponseDTO } from "@/api/planvet/dto/response/InvoiceResponseDTO";
import { UsePaymentService } from "@/api/planvet/use/UsePayment";
import { UseUserService } from "@/api/planvet/use/UseUser";
import { Loader } from "@/components/Loader";
import Modal from "@/components/modal/Modal";
import { PaymentByBoleto } from "@/components/Payments/PaymentByBoleto";
import { PaymentByCard } from "@/components/Payments/PaymentByCard";
import { PaymentByPix } from "@/components/Payments/PaymentByPix";
import React, { useEffect, useState } from "react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: InvoiceResponseDTO;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, invoice }) => {
  if (!invoice) return;
  const [paymentMethod, setPaymentMethod] = useState(invoice.paymentMethod);
  if (!invoice) return null;

  const [valid, setValid] = useState(false);

  const { data, isLoading } = UseUserService.user.me();
  const { mutate, isPending } = UsePaymentService.user.createCharge();

  useEffect(() => {
    if (!data) return;
    if (data?.cityId && data.cep && data.street) setValid(true);
  }, [data]);

  useEffect(() => {
    if (!invoice) return;
    if (!invoice.transactionCode) {
      mutate({ invoiceId: invoice.id, paymentMethod: invoice.paymentMethod });
    }
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Pagamento - ${invoice.originalDate}`}>
      {isLoading || isPending ? (
        <Loader message="Carregando informações..." />
      ) : (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-slate-500 uppercase font-bold">Valor a pagar</p>
            <p className="text-4xl font-black text-slate-800">R$ {invoice.amount}</p>
          </div>
          {!valid && (
            <div>Precisamos das suas informações de endereço para prosseguir com o pagamento.</div>
          )}
          {valid && paymentMethod === "CARD" && (
            <PaymentByCard
              cardNumber="12911231  21 112341"
              cvv=""
              expiry=""
              inFocus="expiry"
              name=""
            />
          )}
          {valid && paymentMethod === "PIX" && <PaymentByPix invoice={invoice} />}
          {valid && paymentMethod === "BOLETO" && (
            <PaymentByBoleto invoice={invoice} payOnPix={() => setPaymentMethod("PIX")} />
          )}
        </div>
      )}
    </Modal>
  );
};

export default PaymentModal;
