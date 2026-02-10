import React, { useState } from "react";
import { useContracts } from "../hooks/useContracts";
import { usePets } from "../hooks/usePets";
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Download,
  ExternalLink,
  CreditCard,
  QrCode,
  Loader2,
} from "lucide-react";
import Badge from "../components/Badge";
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE = 1;

const Contracts: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: contracts = [], isLoading: loadingContracts } = useContracts();
  const { data: pets = [], isLoading: loadingPets } = usePets();

  const totalPages = Math.ceil(contracts.length / ITEMS_PER_PAGE);
  const paginatedContracts = contracts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loadingContracts || loadingPets) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald-600" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Meus Contratos</h2>
        <p className="text-slate-500 text-sm">
          Cada pet possui seu próprio plano e condições específicas.
        </p>
      </div>

      <div className="space-y-6">
        {paginatedContracts.map((contract) => {
          const pet = pets.find((p) => p.id === contract.petId);
          return (
            <div
              key={contract.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row">
                <div className="p-8 md:w-1/3 bg-slate-50 border-r border-slate-100 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={pet?.photo}
                          className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white shadow-sm"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-lg">
                          <CheckCircle2 size={12} />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg">{pet?.name}</h3>
                        <p className="text-xs font-bold text-emerald-600 uppercase tracking-tighter">
                          {contract.planName}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-bold uppercase">Status</span>
                        <Badge variant="success">{contract.status}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-bold uppercase">Pagamento</span>
                        <div className="flex items-center gap-1 text-slate-700 font-bold">
                          {contract.paymentMethod === "Cartão" ? (
                            <CreditCard size={12} />
                          ) : (
                            <QrCode size={12} />
                          )}
                          {contract.paymentMethod}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 space-y-2">
                    <button className="w-full flex items-center justify-center space-x-2 bg-emerald-600 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
                      <Download size={16} />
                      <span>Contrato PDF</span>
                    </button>
                    <button className="w-full flex items-center justify-center space-x-2 bg-white border border-slate-200 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                      <ExternalLink size={16} />
                      <span>Rede Credenciada</span>
                    </button>
                  </div>
                </div>

                <div className="p-8 flex-1">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1 tracking-widest">
                        Ativo desde
                      </p>
                      <p className="font-bold text-slate-700">
                        {new Date(contract.startDate).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1 tracking-widest">
                        Renovação
                      </p>
                      <p className="font-bold text-slate-700">
                        {new Date(contract.renewalDate).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1 tracking-widest">
                        Valor Mensal
                      </p>
                      <p className="font-black text-emerald-700">
                        R$ {contract.monthlyValue.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1 tracking-widest">
                        Apólice Nº
                      </p>
                      <p className="font-bold text-slate-700">
                        #{contract.id.split("-")[1] || "1234"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default Contracts;
