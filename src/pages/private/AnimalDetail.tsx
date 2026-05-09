import { animalPhotoMapped } from "@/api/planvet/mapped";
import { UseAnimalService } from "@/hooks/planvet/UseAnimal";
import { UseContractService } from "@/hooks/planvet/UseContract";
import { ContractCreateModal } from "@/components/modal/ContractCreateModal";
import { contractStatusMapped, contractBadgeMapped } from "@/api/planvet/mapped";
import { Main } from "@/components/template/main";
import {
  ArrowLeft,
  FileText,
  Hash,
  Loader2,
  PawPrint,
  Plus,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";

// ─── helpers ──────────────────────────────────────────────────────────────────

function formatDate(value: string | number | undefined) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("pt-BR");
}

// ─── sub-components ───────────────────────────────────────────────────────────

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

// ─── main component ───────────────────────────────────────────────────────────

const AnimalDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const numericId = Number(id);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const fromLabel = (location.state as { fromLabel?: string })?.fromLabel || "Voltar";
  const urlPlanId = Number(searchParams.get("planId")) || 47;

  useEffect(() => {
    if (searchParams.get("contract") === "true") {
      setIsContractModalOpen(true);
      navigate(`/animals/${numericId}`, { replace: true, state: location.state });
    }
  }, []);

  const { data: animal, isLoading } = UseAnimalService.useGetById(numericId);
  const { data: contracts = [] } = UseContractService.user.useGetAll();
  const animalContract = contracts.find((c) => c.animalId === numericId) ?? null;

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald-600" size={40} />
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-4 text-slate-400">
        <PawPrint size={48} strokeWidth={1.2} />
        <p className="font-semibold">Animal não encontrado.</p>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-emerald-600 font-bold hover:underline"
        >
          Voltar
        </button>
      </div>
    );
  }

  const sexLabel = animal.sex === "macho" ? "Macho" : animal.sex === "femea" ? "Fêmea" : "—";

  return (
    <Main
      title={animal.name}
      description="Informações completas do animal vinculado ao contrato."
    >
      {/* ── back button ── */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600 font-semibold mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        {fromLabel}
      </button>

      {/* ── hero ── */}
      <div className="relative bg-gradient-to-br from-violet-600 to-purple-700 rounded-3xl p-8 mb-6 overflow-hidden shadow-lg">
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-white/10" />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative shrink-0">
            <img
              src={animalPhotoMapped(animal.photo)}
              alt={animal.name}
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white/30 shadow-xl"
            />
            <div className="absolute -bottom-2 -right-2 bg-white rounded-xl p-1.5 shadow">
              <PawPrint size={14} className="text-violet-600" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-violet-200 text-xs font-bold uppercase tracking-widest mb-1">
              {animal.specie?.name ?? "Animal"} · {animal.breed?.name ?? "—"}
            </p>
            <h2 className="text-white text-3xl font-extrabold truncate">{animal.name}</h2>
            <p className="text-violet-100 text-sm font-medium mt-1">
              {sexLabel} · Nascido em {formatDate(animal.brithDay)}
            </p>
          </div>
        </div>

        {/* quick stats */}
        <div className="relative mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Espécie", value: animal.specie?.name ?? "—" },
            { label: "Raça", value: animal.breed?.name ?? "—" },
            { label: "Sexo", value: sexLabel },
            { label: "Nascimento", value: formatDate(animal.brithDay) },
          ].map((item) => (
            <div key={item.label} className="bg-white/10 rounded-xl px-4 py-3">
              <p className="text-violet-200 text-[10px] font-bold uppercase tracking-widest">
                {item.label}
              </p>
              <p className="text-white font-bold text-sm mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── cards grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dados básicos */}
        <Card>
          <SectionTitle icon={<PawPrint size={14} />} label="Dados do Animal" />
          <InfoRow label="Nome" value={animal.name} />
          <InfoRow label="Espécie" value={animal.specie?.name} />
          <InfoRow label="Raça" value={animal.breed?.name} />
          <InfoRow label="Sexo" value={sexLabel} />
          <InfoRow label="Nascimento" value={formatDate(animal.brithDay)} />
          <InfoRow label="Cor" value={animal.color || "—"} />
          {animal.characteristics && (
            <InfoRow label="Características" value={animal.characteristics} />
          )}
          {animal.fatherName && <InfoRow label="Pai" value={animal.fatherName} />}
          {animal.motherName && <InfoRow label="Mãe" value={animal.motherName} />}
        </Card>

        {/* Saúde */}
        <Card>
          <SectionTitle icon={<Stethoscope size={14} />} label="Saúde" />
          <InfoRow
            label="Possui Doença"
            value={
              <span
                className={`px-2 py-0.5 rounded-md text-xs font-bold ${
                  animal.hasDisease
                    ? "bg-red-50 text-red-600"
                    : "bg-emerald-50 text-emerald-600"
                }`}
              >
                {animal.hasDisease ? "Sim" : "Não"}
              </span>
            }
          />
          {animal.deseaseDescription && (
            <InfoRow label="Descrição da Doença" value={animal.deseaseDescription} />
          )}
          <InfoRow
            label="Disp. p/ Reprodução"
            value={
              <span
                className={`px-2 py-0.5 rounded-md text-xs font-bold ${
                  animal.availableForBreeding
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-slate-50 text-slate-500"
                }`}
              >
                {animal.availableForBreeding ? "Sim" : "Não"}
              </span>
            }
          />
        </Card>

        {/* Identificadores */}
        <Card>
          <SectionTitle icon={<Hash size={14} />} label="Identificadores" />
          {animal.microChip && <InfoRow label="Microchip" value={animal.microChip} />}
          {animal.hashCode && <InfoRow label="Hash Code" value={animal.hashCode} />}
          <InfoRow label="ID Animal" value={`#${animal.id}`} />
          <InfoRow label="ID Usuário" value={`#${animal.userId}`} />
          <InfoRow label="Cadastrado em" value={formatDate(animal.createdAt)} />
          <InfoRow label="Atualizado em" value={formatDate(animal.updatedAt)} />
        </Card>

        {/* Plano / Contrato */}
        <Card>
          <SectionTitle icon={<ShieldCheck size={14} />} label="Plano de Saúde" />
          {animalContract ? (
            <>
              <InfoRow
                label="Status"
                value={
                  <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${
                    animalContract.status === "ACTIVE" || animalContract.status === "ENROLLMENT"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-red-50 text-red-500"
                  }`}>
                    {contractStatusMapped(animalContract.status)}
                  </span>
                }
              />
              <InfoRow label="Nº Contrato" value={`#${animalContract.contractNumber}`} />
              {animalContract.plan && (
                <InfoRow label="Plano" value={animalContract.plan.name} />
              )}
              <InfoRow label="Pagamento" value={animalContract.paymentMethod} />
              {animalContract.dueCycleDay && (
                <InfoRow label="Vencimento" value={`Dia ${animalContract.dueCycleDay}`} />
              )}
              <InfoRow label="Início" value={formatDate(animalContract.startDate)} />
              <div className="mt-4">
                <button
                  onClick={() => navigate(`/contracts/${animalContract.id}`)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-slate-100 text-slate-500 hover:border-emerald-200 hover:text-emerald-600 font-bold text-sm transition-all"
                >
                  <FileText size={16} />
                  Ver Contrato Completo
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 gap-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300">
                <ShieldCheck size={28} />
              </div>
              <div>
                <p className="font-bold text-slate-700 text-sm">Sem plano ativo</p>
                <p className="text-slate-400 text-xs mt-1">
                  Contrate um plano para proteger {animal.name.split(" ")[0]}.
                </p>
              </div>
              <button
                onClick={() => setIsContractModalOpen(true)}
                className="flex items-center gap-2 bg-azul-600 hover:bg-azul-700 text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm text-sm"
              >
                <Plus size={16} />
                Contratar Plano
              </button>
            </div>
          )}
        </Card>
      </div>

      <ContractCreateModal
        isOpen={isContractModalOpen}
        onClose={() => setIsContractModalOpen(false)}
        animalId={numericId}
        planId={urlPlanId}
        animalName={animal.name}
        onCreated={() => {}}
      />
    </Main>
  );
};

export default AnimalDetail;
