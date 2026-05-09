import {
  InvoiceResponseDTO,
  InvoiceResponseMapped,
} from "@/api/planvet/dto/response/InvoiceResponseDTO";
import { animalPhotoMapped } from "@/api/planvet/mapped";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const statusStyle = {
  PAID:      { dot: "bg-emerald-400", text: "text-emerald-600", amount: "text-slate-400 line-through" },
  OPEN:      { dot: "bg-amber-400 animate-pulse", text: "text-amber-600", amount: "text-slate-800" },
  CANCELLED: { dot: "bg-rose-400", text: "text-rose-500", amount: "text-slate-400 line-through" },
};

export function InvoiceCard(props: { invoice: InvoiceResponseDTO }) {
  const navigate = useNavigate();
  const s = statusStyle[props.invoice.status] ?? statusStyle.OPEN;

  return (
    <button
      onClick={() => navigate(`/invoices/${props.invoice.id}`, { state: { invoice: props.invoice } })}
      className="w-full bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 active:scale-[0.99] transition-all flex items-center gap-4 px-5 py-4 text-left group"
    >
      {/* Pet photo */}
      <div className="relative shrink-0">
        <img
          src={animalPhotoMapped(props.invoice.contract?.animal?.photo || "")}
          className="w-11 h-11 rounded-xl object-cover"
        />
        <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${s.dot}`} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-slate-800 text-sm truncate leading-tight">
          {props.invoice.contract?.animal?.name ?? "Animal"}
        </p>
        <p className="text-xs text-slate-400 font-medium mt-0.5">
          {props.invoice.originalDate} · Venc. {props.invoice.dueDate}
        </p>
      </div>

      {/* Status + Amount */}
      <div className="shrink-0 text-right">
        <p className={`font-black text-base leading-tight ${s.amount}`}>
          R$ {Number(props.invoice.amount).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </p>
        <p className={`text-[10px] font-bold uppercase tracking-wide mt-0.5 ${s.text}`}>
          {InvoiceResponseMapped.status(props.invoice.status)}
        </p>
      </div>

      <ChevronRight size={16} className="text-slate-200 group-hover:text-slate-400 transition-colors shrink-0" />
    </button>
  );
}
