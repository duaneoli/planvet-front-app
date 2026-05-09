import { UseUserService } from "@/hooks/planvet/UseUser";
import { Main } from "@/components/template/main";
import { getInitials } from "@/hooks/functions";
import dayjs from "dayjs";
import {
  CreditCard,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Shield,
  Smartphone,
  User
} from "lucide-react";
import React from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

function formatDate(value: string | Date | undefined) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("pt-BR");
}

function formatCPF(cpf: string | undefined) {
  if (!cpf) return "—";
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function formatPhone(phone: string | undefined) {
  if (!phone) return "—";
  if (phone.length === 11) {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
  return phone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
}

// ─── sub-components ───────────────────────────────────────────────────────────

function SectionTitle({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm">
        {icon}
      </div>
      <h3 className="font-bold text-slate-700 text-sm uppercase tracking-widest">{label}</h3>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="group flex flex-col gap-1 py-1.5 px-3 -mx-3 rounded-xl hover:bg-slate-50 transition-colors">
      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
        {label}
      </span>
      <span className="text-sm font-semibold text-slate-700 capitalize">{value ?? "—"}</span>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-3xl border border-slate-100 shadow-sm p-8 ${className}`}>
      {children}
    </div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

const Profile: React.FC = () => {
  const { data: user, isLoading: isLoadingUser } = UseUserService.user.me();
  const { data: card, isLoading: isLoadingCard } = UseUserService.user.card();

  if (isLoadingUser || isLoadingCard) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald-600" size={40} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-4 text-slate-400">
        <User size={48} strokeWidth={1.2} />
        <p className="font-semibold text-lg">Usuário não encontrado.</p>
      </div>
    );
  }

  const genderLabel =
    user.gender === "M" ? "Masculino" : user.gender === "F" ? "Feminino" : "Não Informado";

  return (
    <Main title="Meu Perfil" description="Gerencie suas informações pessoais e de pagamento.">
      {/* ── hero ── */}
      <div className="relative bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[2.5rem] p-10 mb-10 overflow-hidden shadow-lg border border-white/20">
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-emerald-400/10 blur-2xl" />

        <div className="relative flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="w-28 h-28 rounded-[2rem] bg-white ring-4 ring-emerald-500/30 flex items-center justify-center text-emerald-600 text-3xl font-black shadow-2xl">
              {getInitials(user.fullName)}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-50 overflow-hidden rounded-xl p-1.5 shadow-lg border-2 border-white">
              <Shield size={16} className="text-emerald-500" />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-white text-3xl font-black mb-2 tracking-tight">
              {user.fullName}
            </h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-2xl text-xs font-bold text-emerald-100 ring-1 ring-white/20 shadow-sm">
                <Mail size={14} />
                {user.fullName.toLowerCase().split(" ")[0]}@planvet.com.br
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-2xl text-xs font-bold text-emerald-100 ring-1 ring-white/20 shadow-sm">
                <BadgeCheck size={14} className="text-emerald-300" />
                Dono de Pet Ativo
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* main columns */}
        <div className="lg:col-span-2 space-y-8">
          {/* basic info */}
          <Card>
            <SectionTitle icon={<User size={18} />} label="Dados Pessoais" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
              <InfoRow label="Nome Completo" value={user.fullName} />
              <InfoRow label="CPF" value={formatCPF(user.cpf)} />
              <InfoRow label="RG" value={user.rg} />
              <InfoRow label="Gênero" value={genderLabel} />
              <InfoRow label="Nascimento" value={formatDate(user.birthDate)} />
              <InfoRow label="ID do Cliente" value={`#${user.id}`} />
            </div>
          </Card>

          {/* address info */}
          <Card>
            <SectionTitle icon={<MapPin size={18} />} label="Endereço Residencial" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
              <div className="sm:col-span-2">
                <InfoRow
                  label="Logradouro"
                  value={`${user.street}, ${user.streetNumber}${
                    user.streetComplement ? ` - ${user.streetComplement}` : ""
                  }`}
                />
              </div>
              <InfoRow label="Bairro" value={user.neighborhood} />
              <InfoRow label="CEP" value={user.cep} />
              <InfoRow label="Cidade" value={user.city?.nome} />
              <InfoRow label="Estado" value={user.state?.nome} />
            </div>
          </Card>
        </div>

        {/* side column */}
        <div className="space-y-8">
          {/* contact info */}
          <Card>
            <SectionTitle icon={<Smartphone size={18} />} label="Contato" />
            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 group hover:bg-emerald-50 hover:border-emerald-100 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-emerald-600 shadow-sm transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    E-mail Primário
                  </p>
                  <p className="text-sm font-bold text-slate-700 truncate max-w-[140px]">
                    {user.fullName.toLowerCase().split(" ")[0]}@planvet.com.br
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 group hover:bg-emerald-50 hover:border-emerald-100 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-emerald-600 shadow-sm transition-colors">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Telefone
                  </p>
                  <p className="text-sm font-bold text-slate-700">{formatPhone(user.phone)}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 group hover:bg-emerald-50 hover:border-emerald-100 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-emerald-600 shadow-sm transition-colors">
                  <Smartphone size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Celular
                  </p>
                  <p className="text-sm font-bold text-slate-700">
                    {formatPhone(user.cellPhone)}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* payment info */}
          <Card className="p-0 overflow-hidden border-none shadow-xl bg-slate-50">
            <div className="p-8 pb-4">
              <SectionTitle
                icon={<CreditCard size={18} className="text-emerald-500" />}
                label="Método de Pagamento"
              />
            </div>
            
            <div className="px-6 pb-8 flex flex-col items-center">
              <div className="w-full flex justify-center py-2 h-[160px] overflow-hidden">
                <div className="scale-[0.75] sm:scale-90 origin-top">
                  <Cards
                    number={`**** **** **** ${card?.numeroFinal || "0000"}`}
                    name={card?.holderName || user.fullName}
                    expiry={dayjs(card?.expiration).format("MM/YY") || "••/••"}
                    cvc=""
                    focused=""
                    preview={true}
                    issuer={card?.bandeira?.toLowerCase() || 'unknown'}
                  />
                </div>
              </div>

              <div className="mt-8 w-full p-4 bg-white rounded-2xl border border-slate-100 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Status</span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-lg font-black uppercase">Ativo</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Main>
  );
};

// Internal utility since its missing from lucide but added manually for visual polish
function BadgeCheck({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default Profile;
