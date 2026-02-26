import { InvoiceResponseDTO } from "@/api/planvet/dto/response/InvoiceResponseDTO";
import { UsePaymentService } from "@/api/planvet/use/UsePayment";
import Button from "@/components/Button";
import { Check, Copy } from "lucide-react";
import React, { useEffect } from "react";
import Barcode from "react-barcode";
import { toast } from "sonner";

type PaymentByBoletoProps = {
  invoice: InvoiceResponseDTO;
  payOnPix: () => void;
};

export function PaymentByBoleto(props: PaymentByBoletoProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Código copiado para area de transferencia.");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const { data } = UsePaymentService.user.getCharge(props.invoice.id);
  const { mutate, isPending } = UsePaymentService.user.createCharge();

  useEffect(() => {
    if (!props.invoice) return;
    if (!props.invoice.transactionCode) {
      console.log("mutate");
      mutate({ invoiceId: props.invoice.id, data: { paymentMethod: props.invoice.paymentMethod } });
    }
  }, []);

  return (
    <div className="space-y-4">
      {!data ? (
        <span>Buscando informacoes do boleto</span>
      ) : (
        <>
          <div className="bg-slate-50 p-6 rounded-2xl flex flex-col items-center justify-center border border-slate-200">
            {/* <Barcode size={64} className="text-slate-400 mb-2" /> */}
            <Barcode value={data?.bankSlip.barCode} displayValue={false} />
            <p className="text-sm font-bold text-slate-700">Bsoleto Bancário</p>
            <p className="text-xs text-slate-500">Vencimento em {props.invoice.dueDate}</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">
              Linha Digitável
            </label>
            <div className="relative">
              <input
                readOnly
                value={data?.bankSlip.barCode}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-mono text-slate-500 pr-12 outline-none"
              />
              <button
                onClick={() => handleCopy(data?.bankSlip.barCode)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
          </div>
          <div className="space-y-2 flex flex-row w-full gap-2">
            <Button
              variant="outline"
              className="flex-1"
              icon={<Copy size={16} />}
              onClick={props.payOnPix}
            >
              Pagar com Pix
            </Button>
            <Button variant="outline" className="flex-1" icon={<Copy size={16} />}>
              <a href={data.bankSlip.bankSlipUrl} target="_blank" rel="noopener noreferrer">
                Baixar PDF
              </a>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
