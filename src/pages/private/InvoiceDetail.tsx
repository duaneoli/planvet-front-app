import { InvoiceResponseDTO, InvoiceResponseMapped } from "@/api/planvet/dto/response/InvoiceResponseDTO";
import { animalPhotoMapped } from "@/api/planvet/mapped";
import Button from "@/components/Button";
import PaymentModal from "@/components/modal/PaymentModal";
import { Main } from "@/components/template/main";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  FileText,
  Lock,
  PawPrint,
  XCircle,
} from "lucide-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function formatCurrency(value: string | number | undefined) {
  if (value === undefined || value === null) return "—";
  return Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function Row({ label, value, highlight }: { label: string; value: React.ReactNode; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-slate-100 last:border-0">
      <span className="text-sm text-slate-400 font-medium">{label}</span>
      <span className={`text-sm font-semibold text-right ${highlight ? "text-emerald-600 font-black text-base" : "text-slate-700"}`}>
        {value ?? "—"}
      </span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 px-1">{title}</p>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5">
        {children}
      </div>
    </div>
  );
}

const statusConfig = {
  PAID: {
    label: "Pago",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    icon: <CheckCircle2 size={14} className="text-emerald-600" />,
  },
  OPEN: {
    label: "Pendente",
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-400",
    icon: null,
  },
  CANCELLED: {
    label: "Cancelado",
    bg: "bg-rose-50",
    text: "text-rose-600",
    dot: "bg-rose-400",
    icon: <XCircle size={14} className="text-rose-500" />,
  },
};

const InvoiceDetail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const invoice = location.state?.invoice as InvoiceResponseDTO | undefined;

  if (!invoice) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-4 text-slate-400">
        <FileText size={48} strokeWidth={1.2} />
        <p className="font-semibold">Fatura não encontrada.</p>
        <button
          onClick={() => navigate("/invoices")}
          className="text-sm text-emerald-600 font-bold hover:underline"
        >
          Voltar para faturas
        </button>
      </div>
    );
  }

  const animal = invoice.contract?.animal;
  const isOpen = invoice.status === "OPEN";
  const status = statusConfig[invoice.status] ?? statusConfig.OPEN;

  return (
    <Main title="" description="">
      {/* Back */}
      <button
        onClick={() => navigate("/invoices")}
        className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 font-semibold mb-8 transition-colors"
      >
        <ArrowLeft size={15} />
        Faturas
      </button>

      {/* ── Amount hero ─────────────────────────────────────────── */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-5 ${status.bg} ${status.text}`}>
          {status.icon ?? (
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot} animate-pulse`} />
          )}
          {status.label}
        </div>

        <div className="flex items-start gap-1">
          <span className="text-xl font-bold text-slate-400 mt-3">R$</span>
          <span className="text-7xl font-black text-slate-800 tracking-tight leading-none">
            {formatCurrency(invoice.amount)}
          </span>
        </div>

        <p className="text-slate-400 text-sm font-medium mt-3">
          Referência {invoice.originalDate} · Parcela #{invoice.installmentNumber}
        </p>
      </div>

      {/* ── Sections ────────────────────────────────────────────── */}
      {/* pb-28 garante que o sticky bar não tape o último item */}
      <div className={`space-y-5 max-w-lg mx-auto ${isOpen ? "pb-28" : ""}`}>

        {/* Animal */}
        <Section title="Pet">
          <button
            onClick={() => navigate(`/animals/${animal?.id}`)}
            className="w-full flex items-center gap-4 py-4 group"
          >
            <div className="relative shrink-0">
              <img
                src={animalPhotoMapped(animal?.photo || "")}
                alt={animal?.name}
                className="w-12 h-12 rounded-2xl object-cover"
              />
              <div className="absolute -bottom-1 -right-1 bg-emerald-50 border border-white rounded-lg p-0.5">
                <PawPrint size={10} className="text-emerald-600" />
              </div>
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="font-bold text-slate-800 text-base truncate">{animal?.name ?? "—"}</p>
              <p className="text-xs text-slate-400 font-medium">
                {animal?.breed?.name ?? "—"} · {animal?.specie?.name ?? "—"}
              </p>
            </div>
            <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500 transition-colors shrink-0" />
          </button>
        </Section>

        {/* Datas */}
        <Section title="Datas">
          <Row label="Referência" value={invoice.originalDate} />
          <Row label="Vencimento" value={invoice.dueDate} />
          {invoice.processingDate && <Row label="Emissão" value={invoice.processingDate} />}
          {invoice.paymentDate && <Row label="Pago em" value={invoice.paymentDate} />}
          {invoice.settlementDate && <Row label="Liquidação" value={invoice.settlementDate} />}
        </Section>

        {/* Valores */}
        <Section title="Valores">
          <Row label="Valor base" value={`R$ ${formatCurrency(invoice.originalAmount)}`} />
          <Row label="Multa" value={`R$ ${formatCurrency(invoice.fine)}`} />
          <Row label="Juros" value={`R$ ${formatCurrency(invoice.interest)}`} />
          <Row label="Total" value={`R$ ${formatCurrency(invoice.amount)}`} highlight />
        </Section>

        {/* Cobrança */}
        <Section title="Cobrança">
          <Row label="Método" value={invoice.paymentMethod} />
          <Row label="Parcela nº" value={`#${invoice.installmentNumber}`} />
          {invoice.description && <Row label="Descrição" value={invoice.description} />}
          {invoice.settlementNote && <Row label="Observação" value={invoice.settlementNote} />}
          {invoice.barcode && (
            <Row
              label="Código de barras"
              value={<span className="font-mono text-[11px] break-all">{invoice.barcode}</span>}
            />
          )}
        </Section>

        {/* Status final para faturas não pendentes */}
        {!isOpen && (
          <div className={`rounded-2xl p-5 flex items-center gap-3 ${status.bg}`}>
            {status.icon}
            <p className={`text-sm font-semibold ${status.text}`}>
              {invoice.status === "PAID" ? "Fatura já foi paga. Obrigado!" : "Esta fatura foi cancelada."}
            </p>
          </div>
        )}
      </div>

      {/* ── Sticky CTA ──────────────────────────────────────────── */}
      {isOpen && (
        <div className="sticky bottom-0 -mx-4 lg:-mx-8 bg-white/80 backdrop-blur-md border-t border-slate-100 px-4 lg:px-8 py-4">
          <div className="max-w-lg mx-auto flex items-center gap-4">
            <div className="shrink-0">
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">Total</p>
              <p className="font-black text-slate-800 text-lg leading-tight">
                R$ {formatCurrency(invoice.amount)}
              </p>
            </div>
            <Button
              variant="primary"
              size="lg"
              className="flex-1 rounded-2xl text-base font-black py-4"
              onClick={() => setIsPaymentModalOpen(true)}
            >
              Pagar agora
            </Button>
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-2 text-slate-400">
            <Lock size={10} />
            <span className="text-[10px] font-medium">Pagamento seguro</span>
          </div>
        </div>
      )}

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        invoice={invoice}
      />
    </Main>
  );
};

export default InvoiceDetail;
