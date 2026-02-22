import { UseContractService } from "@/api/planvet/use/UseContract";
import { Main } from "@/components/template/main";
import { CheckCircle2, CreditCard, Loader2, QrCode } from "lucide-react";
import React from "react";
import Badge from "../../components/Badge";

const Contracts: React.FC = () => {
  const { data: contracts = [], isLoading: loadingContracts } = UseContractService.user.useGetAll();

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
      description="Cada pet possui seu próprio plano e condições específicas."
    >
      <div className="space-y-6">
        {contracts.map((contract) => {
          return (
            <div
              key={contract.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md hover:shadow-md transition-all duration-300 hover:bg-slate-100"
              onClick={() => alert("Duane")}
            >
              <div className="flex flex-col md:flex-row">
                <div className="p-8 md:w-1/3 bg-slate-100 border-r border-slate-100 flex flex-col justify-between hover:bg-slate-100">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={contract.animal.photo}
                          className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white shadow-sm"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-lg">
                          <CheckCircle2 size={12} />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg">{contract.animal.name}</h3>
                        <p className="text-xs font-bold text-emerald-600 uppercase tracking-tighter">
                          {contract.plan.name}
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
                        {new Date(contract.renewal).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1 tracking-widest">
                        Valor Mensal
                      </p>
                      <p className="font-black text-emerald-700">R$ {(10.1).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1 tracking-widest">
                        Apólice Nº
                      </p>
                      <p className="font-bold text-slate-700">#{contract.id}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /> */}
    </Main>
  );
};

export default Contracts;
