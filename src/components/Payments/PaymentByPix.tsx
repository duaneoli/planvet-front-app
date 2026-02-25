import { InvoiceResponseDTO } from "@/api/planvet/dto/response/InvoiceResponseDTO";
import { UsePaymentService } from "@/api/planvet/use/UsePayment";
import { Loader } from "@/components/Loader";
import dayjs from "dayjs";
import { Check, Copy } from "lucide-react";
import React from "react";

type PaymentByPixProps = {
  invoice: InvoiceResponseDTO;
};

export function PaymentByPix(props: PaymentByPixProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const { data, isLoading } = UsePaymentService.user.getCharge(props.invoice.id);

  return (
    <div className="space-y-4">
      {!data ? (
        <Loader message="Buscando informacoes do boleto..." />
      ) : (
        <>
          <div className="bg-emerald-50 p-6 rounded-2xl flex flex-col items-center justify-center border border-emerald-100">
            <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
              <img
                className="w-[300px] h-[300px]"
                src={`data:png;base64,${data.pix.encodedImage}`}
              ></img>
            </div>
            <p className="text-xs text-emerald-700 font-medium text-center px-4 gap-4">
              Escaneie o QR Code acima no app do seu banco para pagar instantaneamente.
            </p>
            <p className="text-xs text-emerald-700 font-medium text-center px-4 gap-4">
              Expira em: {dayjs(data?.pix.expirationDate).format("DD/MM/YYYY HH:mm:ss")}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">
              Linha Digitável
            </label>
            <div className="relative">
              <input
                readOnly
                value={data.pix.payload}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-mono text-slate-500 pr-12 outline-none"
              />
              <button
                onClick={() => handleCopy(data?.pix.payload)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
          </div>
        </>
      )}
      {/* <div className="space-y-2 flex flex-row w-full">
        <Button onClick={() => {}} variant="primary" className="flex-1">
          Confirmar Pagamento
        </Button>
      </div> */}
    </div>
  );
}
