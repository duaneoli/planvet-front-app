import { InvoiceResponseDTO } from "@/api/planvet/dto/response/InvoiceResponseDTO";
import { animalPhotoMapped } from "@/api/planvet/mapped";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import { Clock, Download, Eye } from "lucide-react";

export function InvoiceCard(props: { invoice: InvoiceResponseDTO }) {
  return (
    <div
      key={props.invoice.id}
      className="bg-white rounded-3xl border border-slate-200 p-4 md:p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center gap-4 md:gap-6 group"
    >
      {/* Pet Info & Status */}
      <div className="flex items-center justify-between md:justify-start gap-4 md:w-1/4">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <img
              src={animalPhotoMapped(props.invoice.contract?.animal?.photo || "")}
              className="w-12 h-12 rounded-2xl object-cover ring-4 ring-slate-50"
            />
          </div>
          <div className="overflow-hidden">
            <p className="font-bold text-slate-800 text-base leading-tight truncate">
              {props.invoice.contract?.animal?.name}
            </p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
              {props.invoice.originalDate}
            </p>
          </div>
        </div>
        <div className="md:hidden">
          <Badge
            variant={
              props.invoice.status === "Pago"
                ? "success"
                : props.invoice.status === "Pendente"
                  ? "warning"
                  : "danger"
            }
            pulse={props.invoice.status !== "Pago"}
          >
            {props.invoice.status}
          </Badge>
        </div>
      </div>

      {/* Details: Due Date & Method */}
      <div className="flex-1 grid grid-cols-2 md:flex md:items-center gap-4 md:gap-12 py-4 md:py-0 border-y md:border-y-0 border-slate-50">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            Vencimento
          </p>
          <div className="flex items-center gap-1.5 text-slate-600">
            <Clock size={14} className="text-slate-300" />
            <p className="text-xs font-semibold">{props.invoice.dueDate}</p>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            Método
          </p>
          <Badge variant="neutral" className="text-[9px] lowercase font-medium border-slate-200">
            {props.invoice.paymentMethod}
          </Badge>
        </div>
        <div className="hidden md:block">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            Status
          </p>
          <Badge
            variant={
              props.invoice.status === "Pago"
                ? "success"
                : props.invoice.status === "Pendente"
                  ? "warning"
                  : "danger"
            }
            pulse={props.invoice.status !== "Pago"}
          >
            {props.invoice.status}
          </Badge>
        </div>
      </div>

      {/* Value & Actions */}
      <div className="flex items-center justify-between md:w-[250px] gap-6 pt-2 md:pt-0 w-full">
        <div className="md:text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
            Valor
          </p>
          <p className="font-black text-slate-800 text-xl">
            <span className="text-xs font-bold text-slate-400 mr-1">R$</span>
            {props.invoice.amount}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {props.invoice.status !== "Pago" ? (
            <Button
              variant="primary"
              size="sm"
              className="h-10 px-5 rounded-2xl text-xs font-bold shadow-lg shadow-emerald-100"
              //   onClick={() => handleOpenPayment(inv)}
            >
              Pagar
            </Button>
          ) : (
            <button
              className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all"
              title="Ver Comprovante"
            >
              <Download size={20} />
            </button>
          )}
          <button
            className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-2xl transition-all"
            title="Ver Detalhes"
          >
            <Eye size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
