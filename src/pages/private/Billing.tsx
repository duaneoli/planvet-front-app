import { UserInvoiceGetAllRequest } from "@/api/planvet/dto/request/UserInvoiceGetAllRequest";
import { UseInvoiceService } from "@/api/planvet/use/UseInvoice";
import { InvoiceCard } from "@/components/Card/InvoiceCard";
import { Main } from "@/components/template/main";
import { Query } from "@/lib/Query";
import { Clock, CreditCard, Loader2, Settings } from "lucide-react";
import React, { useState } from "react";
import CreditCardModal from "../../components/modal/CreditCardModal";
import PaymentModal from "../../components/modal/PaymentModal";
import { MOCK_USER } from "../../constants";
import { UserProfile } from "../../types";

const queryHistory: UserInvoiceGetAllRequest = Query.paramsToQuery({
  pageSize: 10,
  sortBy: { originalDate: "DESC" },
  filters: { status: ["pg", "ca"] },
});

const Billing: React.FC = () => {
  const [user, setUser] = useState<UserProfile>(MOCK_USER);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isCreditCardModalOpen, setIsCreditCardModalOpen] = useState(false);

  const { data: invoicesAb, isLoading: loadingInvoices } = UseInvoiceService.user.getAll(
    Query.paramsToQuery({
      pageSize: 5,
      sortBy: { originalDate: "ASC" },
      filters: { status: ["ab"] },
    })
  );

  const { data: invoicesHistory, isLoading: invoicesHistoryLoading } =
    UseInvoiceService.user.getAll(queryHistory);

  const handleOpenPayment = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsPaymentModalOpen(true);
  };

  const handleUpdateUser = (updatedUser: UserProfile) => {
    setUser(updatedUser);
  };

  if (loadingInvoices) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald-600" size={40} />
      </div>
    );
  }

  return (
    <Main title="Faturas" description="">
      <div className="space-y-8 animate-in fade-in duration-500">
        {/* <div className="flex bg-slate-100 p-1 rounded-xl self-start sm:self-auto overflow-x-auto">
          <button
            onClick={() => setActivePetId("all")}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${activePetId === "all" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            Todos
          </button>
          {pets.map((pet) => (
            <button
              key={pet.id}
              onClick={() => setActivePetId(pet.id)}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${activePetId === pet.id ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              <img src={"getPetPhoto(pet)"} className="w-4 h-4 rounded-full object-cover" />
              {pet.name}
            </button>
          ))}
        </div> */}
        <div className="flex flex-col gap-4">
          {invoicesAb?.data.map((inv) => (
            <InvoiceCard invoice={inv} />
          ))}
        </div>
        <h2>Histórico</h2>
        <div className="flex flex-col gap-4">
          {invoicesHistory?.data.map((inv) => (
            <InvoiceCard invoice={inv} />
          ))}
        </div>

        {/* <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        /> */}
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        invoice={selectedInvoice}
      />

      <CreditCardModal
        isOpen={isCreditCardModalOpen}
        onClose={() => setIsCreditCardModalOpen(false)}
        user={user}
        onSave={handleUpdateUser}
      />
      {/* Left Column: Alerts & Quick Info */}
      <div className="lg:w-1/4 space-y-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-sm">
          <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
            Resumo Financeiro
          </h3>

          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex gap-3">
              <Clock className="text-emerald-500 shrink-0" size={20} />
              <div>
                <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-tight">
                  Vencimento Próximo
                </p>
                <p className="text-xs text-emerald-700 mt-1 font-medium">
                  Consulte as faturas pendentes abaixo.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <CreditCard size={18} className="text-slate-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Cartão Padrão</p>
                  <p className="text-xs font-bold text-slate-700">•••• {user.cardLastDigits}</p>
                </div>
              </div>
              <button
                onClick={() => setIsCreditCardModalOpen(true)}
                className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-xl transition-colors"
              >
                <Settings size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Billing;
