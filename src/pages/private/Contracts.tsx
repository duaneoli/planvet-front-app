import {
  animalPhotoMapped,
  contractBadgeMapped,
  contractStatusMapped,
  paymentMethodMapped,
} from "@/api/planvet/mapped";
import { UseContractService } from "@/hooks/planvet/UseContract";
import { Main } from "@/components/template/main";
import { BadgeCheck, Calendar, CreditCard, FileText, Loader2, QrCode, Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const Contracts: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: contracts = [], isLoading: loadingContracts } = UseContractService.user.useGetAll();

  const filteredContracts = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return contracts.filter(
      (c) =>
        c.animal?.name.toLowerCase().includes(q) ||
        c.plan?.name.toLowerCase().includes(q) ||
        String(c.id).includes(q) ||
        String(c.contractNumber).includes(q)
    );
  }, [contracts, searchTerm]);

  if (loadingContracts) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald-600" size={40} />
      </div>
    );
  }

  return (
    <Main
      title="Meus Contratos"
      description="Gerencie seus planos e condições de cobertura para cada pet."
    >
      {/* Search Bar */}
      <div className="relative mb-8">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Buscar por pet, plano ou número do contrato..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all shadow-sm"
        />
      </div>

      {/* Empty State */}
      {filteredContracts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200">
          <FileText size={48} strokeWidth={1.2} />
          <p className="font-semibold text-lg">Nenhum contrato encontrado.</p>
          <p className="text-sm">Tente ajustar sua busca ou limpar os filtros.</p>
        </div>
      )}

      {/* Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredContracts.map((contract) => (
          <div
            key={contract.id}
            onClick={() => navigate(`/contracts/${contract.id}`)}
            className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row"
          >
            {/* Side Info / Pet Image */}
            <div className="sm:w-48 bg-slate-50 border-r border-slate-100 p-6 flex flex-col items-center justify-center text-center space-y-4 shrink-0 transition-bg group-hover:bg-emerald-50/30">
              <div className="relative">
                <img
                  src={animalPhotoMapped(contract.animal?.photo)}
                  alt={contract.animal?.name}
                  className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-md transition-transform group-hover:scale-105"
                />
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-xl shadow-sm border-2 border-white">
                  <BadgeCheck size={14} />
                </div>
              </div>
              <div>
                <h3 className="font-extrabold text-slate-800 text-lg leading-tight truncate px-2">
                  {contract.animal?.name}
                </h3>
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">
                  {contract.plan?.name}
                </p>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 flex flex-col justify-between space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Status do Plano
                  </p>
                  <div
                    className={`badge badge-outline h-7 px-3 text-[11px] font-extrabold shadow-sm ${contractBadgeMapped(
                      contract.status
                    )}`}
                  >
                    {contractStatusMapped(contract.status)}
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Pagamento
                  </p>
                  <div className="flex items-center justify-end gap-1.5 text-slate-700 font-bold text-xs bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/50">
                    {contract.paymentMethod === "CREDIT_CARD" ? (
                      <CreditCard size={14} className="text-slate-500" />
                    ) : (
                      <QrCode size={14} className="text-slate-500" />
                    )}
                    {paymentMethodMapped(contract.paymentMethod)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50/50 p-3 rounded-2xl border border-slate-100 transition-bg group-hover:bg-white">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
                    <Calendar size={12} />
                    Início
                  </div>
                  <p className="font-bold text-slate-700 text-sm">
                    {new Date(contract.startDate).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <div className="bg-slate-50/50 p-3 rounded-2xl border border-slate-100 transition-bg group-hover:bg-white">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
                    <Calendar size={12} />
                    Renovação
                  </div>
                  <p className="font-bold text-slate-700 text-sm">
                    {new Date(contract.renewal).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100/60">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Valor Mensal
                  </p>
                  <span className="text-xl font-black text-emerald-700">
                    R$ {contract.plan?.cost}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm group-hover:text-emerald-600 transition-colors">
                  Detalhes
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M7 4l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Main>
  );
};

export default Contracts;
