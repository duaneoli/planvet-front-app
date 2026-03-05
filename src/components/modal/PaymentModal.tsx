import { InvoiceResponseDTO } from "@/api/planvet/dto/response/InvoiceResponseDTO";
import { UseUserService } from "@/api/planvet/use/UseUser";
import { Loader } from "@/components/Loader";
import Modal from "@/components/modal/Modal";
import { PaymentByBoleto } from "@/components/Payments/PaymentByBoleto";
import { PaymentByCard } from "@/components/Payments/PaymentByCard";
import { PaymentByPix } from "@/components/Payments/PaymentByPix";
import { Check, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: InvoiceResponseDTO;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, invoice }) => {
  if (!invoice || !isOpen) return;
  const [paymentMethod, setPaymentMethod] = useState<
    InvoiceResponseDTO["paymentMethod"] | "FINISHED"
  >(invoice.paymentMethod);
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
          {valid && paymentMethod === "CREDIT_CARD" && (
            <PaymentByCard invoice={invoice} change={(status) => setPaymentMethod(status)} />
          )}
          {valid && paymentMethod === "PIX" && (
            <PaymentByPix invoice={invoice} change={(status) => setPaymentMethod(status)} />
          )}
          {valid && paymentMethod === "BOLETO" && (
            <PaymentByBoleto invoice={invoice} change={(status) => setPaymentMethod(status)} />
          )}
          {valid && paymentMethod === "FINISHED" && (
            <div className="flex flex-col items-center justify-center space-y-8 py-12 animate-in zoom-in duration-700 text-center">
              <div className="relative">
                <div className="w-28 h-28 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-emerald-200 z-10 relative">
                  <Check strokeWidth={4} className="animate-in zoom-in duration-500 delay-200" />
                </div>
                <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-25 -z-10"></div>
                <div className="absolute inset-[-10px] bg-emerald-100 rounded-full animate-pulse -z-20"></div>
              </div>
              <div className="bg-emerald-50 px-6 py-3 rounded-2xl flex items-center gap-3 text-emerald-700 font-bold border border-emerald-100">
                <Sparkles size={20} className="text-amber-500 animate-spin" />
                <span>Estamos processando o seu pagamento</span>
              </div>
              <div className="space-y-2">
                <h2 className="text-4xl font-black text-slate-800 tracking-tighter">Obrigado!</h2>
                <p className="text-slate-500 font-medium w-[500px]">
                  Isso pode demorar um pouco, mas fique tranquilo, pode continuar utilizando a
                  plataforma normalmente e logo atualizaremos o status da fatura.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default PaymentModal;
