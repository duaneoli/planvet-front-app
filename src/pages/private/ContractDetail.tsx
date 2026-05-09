import {
  animalPhotoMapped,
  contractStatusMapped,
  paymentMethodMapped,
} from "@/api/planvet/mapped";
import { UseContractService } from "@/hooks/planvet/UseContract";
import { Main } from "@/components/template/main";
import {
  ArrowLeft,
  CreditCard,
  FileText,
  Loader2,
  PawPrint,
  QrCode,
  Shield,
  Tag
} from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

// ─── helpers ──────────────────────────────────────────────────────────────────

function formatDate(value: string | number | undefined) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("pt-BR");
}

function formatCurrency(value: string | number | undefined) {
  if (value === undefined || value === null) return "—";
  return `R$ ${Number(value).toFixed(2).replace(".", ",")}`;
}

function formatPercent(value: string | number | undefined) {
  if (value === undefined || value === null) return "—";
  return `${Number(value).toFixed(2).replace(".", ",")}%`;
}

// ─── sub-components ────────────────────────────────────────────────────────

function SectionTitle({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
        {icon}
      </div>
      <h3 className="font-bold text-slate-700 text-sm uppercase tracking-widest">{label}</h3>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-slate-100 last:border-0">
      <span className="text-xs text-slate-400 font-semibold uppercase tracking-wide whitespace-nowrap">
        {label}
      </span>
      <span className="text-sm font-semibold text-slate-700 text-right">{value ?? "—"}</span>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">{children}</div>
  );
}

// ─── main component ─────────────────────────────────────────────────────────

const ContractDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const numericId = Number(id);

  const { data: contract, isLoading } = UseContractService.user.useGetById(numericId);

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald-600" size={40} />
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-4 text-slate-400">
        <FileText size={48} strokeWidth={1.2} />
        <p className="font-semibold">Contrato não encontrado.</p>
        <button
          onClick={() => navigate("/contracts")}
          className="text-sm text-emerald-600 font-bold hover:underline"
        >
          Voltar para contratos
        </button>
      </div>
    );
  }

  const { animal, plan } = contract;

  const sexLabel = animal?.sex === "macho" ? "Macho" : animal?.sex === "femea" ? "Fêmea" : "—";

  return (
    <Main
      title="Detalhes do Contrato"
      description="Informações completas sobre o contrato e o plano."
    >
      {/* ── back button ── */}
      <button
        onClick={() => navigate("/contracts")}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600 font-semibold mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Voltar para contratos
      </button>

      {/* ── hero header ── */}
      <div className="relative bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 mb-6 overflow-hidden shadow-lg">
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-white/10" />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* pet info — clicável para AnimalDetail */}
          <button
            onClick={() => navigate(`/animals/${animal?.id}`, { state: { fromLabel: 'Voltar para o contrato' } })}
            className="flex items-center gap-6 flex-1 min-w-0 text-left group/pet"
          >
            <div className="relative shrink-0">
              <img
                src={animalPhotoMapped(animal?.photo)}
                alt={animal?.name}
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white/30 shadow-xl group-hover/pet:ring-white/60 transition-all"
              />
              <div className="absolute -bottom-2 -right-2 bg-white rounded-xl p-1.5 shadow">
                <PawPrint size={14} className="text-emerald-600" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-emerald-200 text-xs font-bold uppercase tracking-widest mb-1">
                {animal?.specie?.name ?? "Animal"} · {animal?.breed?.name ?? "—"}
              </p>
              <h2 className="text-white text-3xl font-extrabold truncate group-hover/pet:underline underline-offset-4">
                {animal?.name}
              </h2>
              <p className="text-emerald-100 text-sm font-medium mt-1">{plan?.name}</p>
              <p className="text-emerald-300 text-xs font-semibold mt-2 opacity-0 group-hover/pet:opacity-100 transition-opacity">
                Ver detalhes do animal →
              </p>
            </div>
          </button>

          <div className="shrink-0">
            <div className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider ring-2 ring-white/30 bg-white/20 text-white">
              {contractStatusMapped(contract.status)}
            </div>
          </div>
        </div>

        <div className="relative mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Apólice Nº", value: `#${contract.contractNumber ?? contract.id}` },
            { label: "Ativo Desde", value: formatDate(contract.startDate) },
            { label: "Renovação", value: formatDate(contract.renewal) },
            { label: "Valor Mensal", value: formatCurrency(plan?.cost) },
          ].map((item) => (
            <div key={item.label} className="bg-white/10 rounded-xl px-4 py-3">
              <p className="text-emerald-200 text-[10px] font-bold uppercase tracking-widest">
                {item.label}
              </p>
              <p className="text-white font-bold text-sm mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── grid of cards ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contract details */}
        <Card>
          <SectionTitle icon={<FileText size={14} />} label="Contrato" />
          <InfoRow label="Nº Apólice" value={`#${contract.contractNumber ?? contract.id}`} />
          <InfoRow label="ID Interno" value={`#${contract.id}`} />
          <InfoRow label="Status" value={contractStatusMapped(contract.status)} />
          {contract.statusDetail && (
            <InfoRow label="Detalhe" value={contract.statusDetail} />
          )}
          <InfoRow
            label="Pagamento"
            value={
              <span className="flex items-center gap-1.5">
                {contract.paymentMethod === "CREDIT_CARD" ? (
                  <CreditCard size={13} />
                ) : (
                  <QrCode size={13} />
                )}
                {paymentMethodMapped(contract.paymentMethod)}
              </span>
            }
          />
          <InfoRow label="Vencimento" value={`Dia ${contract.dueCycleDay}`} />
          <InfoRow label="Parcelas" value={contract.installments} />
          <InfoRow label="Taxa de Adesão" value={formatCurrency(contract.signupFee)} />
          <InfoRow label="Início" value={formatDate(contract.startDate)} />
          <InfoRow label="Renovação" value={formatDate(contract.renewal)} />
          {contract.endDate && (
            <InfoRow label="Encerramento" value={formatDate(contract.endDate)} />
          )}
          {contract.cancellationDate && (
            <InfoRow label="Cancelamento" value={formatDate(contract.cancellationDate)} />
          )}
          <InfoRow label="Criado em" value={formatDate(contract.createdAt)} />
        </Card>

        {/* Plan details */}
        <Card>
          <SectionTitle icon={<Shield size={14} />} label="Plano" />
          <InfoRow label="Nome" value={plan?.name} />
          {plan?.groupName && <InfoRow label="Grupo" value={plan.groupName} />}
          {plan?.description && <InfoRow label="Descrição" value={plan.description} />}
          <InfoRow label="Custo Mensal" value={formatCurrency(plan?.cost)} />
          <InfoRow label="Preço" value={formatCurrency(plan?.price)} />
          <InfoRow
            label="Idade Mín."
            value={
              plan?.minAge !== null && plan?.minAge !== undefined
                ? `${plan.minAge} anos`
                : "—"
            }
          />
          <InfoRow label="Idade Máx." value={plan?.maxAge ? `${plan.maxAge} anos` : "—"} />

          {/* <div className="mt-4 pt-4 border-t border-slate-100">
            <SectionTitle icon={<TrendingDown size={14} />} label="Descontos" />
            <InfoRow label="Mensal" value={formatPercent(plan?.monthlyDiscountPct)} />
            <InfoRow label="Trimestral" value={formatPercent(plan?.quarterlyDiscountPct)} />
            <InfoRow label="Semestral" value={formatPercent(plan?.semiannualDiscountPct)} />
            <InfoRow label="Anual" value={formatPercent(plan?.annualDiscountPct)} />
          </div> */}

          <div className="mt-4 pt-4 border-t border-slate-100">
            <SectionTitle icon={<Tag size={14} />} label="Taxas e Multas" />
            <InfoRow label="Multa por Atraso" value={formatCurrency(plan?.lateFee)} />
            <InfoRow label="Penalidade" value={formatPercent(plan?.penalty)} />
            <InfoRow label="Cancelamento" value={formatPercent(plan?.cancellationPenaltyPct)} />
            <InfoRow label="Migração" value={formatCurrency(plan?.migrationFee)} />
            <InfoRow label="IGPM" value={formatPercent(plan?.igpm)} />
          </div>
        </Card>

      </div>
    </Main>
  );
};

export default ContractDetail;
