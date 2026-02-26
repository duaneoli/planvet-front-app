import { InvoiceResponseDTO } from "@/api/planvet/dto/response/InvoiceResponseDTO";
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
  if (!invoice || !isOpen) return;
  const [paymentMethod, setPaymentMethod] = useState(invoice.paymentMethod);
  if (!invoice) return null;

  const [valid, setValid] = useState(false);

  const { data, isLoading } = UseUserService.user.me();

  useEffect(() => {
    if (!data) return;
    if (data?.cityId && data.cep && data.street) setValid(true);
  }, [data]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Pagamento - ${invoice.originalDate}`}>
      {isLoading ? (
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
          {valid && paymentMethod === "CARD" && <PaymentByCard invoice={invoice} />}
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
