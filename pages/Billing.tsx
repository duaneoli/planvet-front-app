
import React, { useState, useMemo } from 'react';
import { MOCK_INVOICES, MOCK_USER, MOCK_PETS } from '../constants';
import { CreditCard, Download, Clock, Settings, Eye, Filter, Plus } from 'lucide-react';
import Badge from '../components/Badge';
import Button from '../components/Button';
import PaymentModal from '../components/PaymentModal';
import CreditCardModal from '../components/CreditCardModal';
import Pagination from '../components/Pagination';
import { UserProfile } from '../types';

const ITEMS_PER_PAGE = 5;

const Billing: React.FC = () => {
  const [user, setUser] = useState<UserProfile>(MOCK_USER);
  const [activePetId, setActivePetId] = useState<string | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isCreditCardModalOpen, setIsCreditCardModalOpen] = useState(false);

  const filteredInvoices = useMemo(() => {
    return activePetId === 'all' 
      ? MOCK_INVOICES 
      : MOCK_INVOICES.filter(inv => inv.petId === activePetId);
  }, [activePetId]);

  // Reset page when changing filter
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activePetId]);

  const totalPages = Math.ceil(filteredInvoices.length / ITEMS_PER_PAGE);
  const paginatedInvoices = filteredInvoices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleOpenPayment = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsPaymentModalOpen(true);
  };

  const handleUpdateUser = (updatedUser: UserProfile) => {
    setUser(updatedUser);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Alerts & Quick Info */}
        <div className="lg:w-1/4 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-sm">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Resumo Financeiro</h3>
            
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex gap-3">
                <Clock className="text-emerald-500 shrink-0" size={20} />
                <div>
                  <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-tight">Vencimento Próximo</p>
                  <p className="text-xs text-emerald-700 mt-1 font-medium">
                    {MOCK_PETS[0].name} em <strong>10/01</strong>
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

            <div className="pt-2">
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                Suas faturas são processadas individualmente por pet para garantir transparência total no uso do plano.
              </p>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full bg-white" 
            icon={<Plus size={18} />}
          >
            Adicionar Novo Método
          </Button>
        </div>

        {/* Right Column: Invoice List with Pet Filtering */}
        <div className="flex-1 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-slate-800">Histórico de Faturas</h2>
              <button 
                onClick={() => setIsCreditCardModalOpen(true)}
                className="lg:hidden p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors"
                title="Configurar Cartão"
              >
                <CreditCard size={20} />
              </button>
            </div>
            
            <div className="flex bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
              <button 
                onClick={() => setActivePetId('all')}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${activePetId === 'all' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Todos
              </button>
              {MOCK_PETS.map(pet => (
                <button 
                  key={pet.id}
                  onClick={() => setActivePetId(pet.id)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${activePetId === pet.id ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <img src={pet.photo} className="w-4 h-4 rounded-full object-cover" />
                  {pet.name}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pet / Referência</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Vencimento</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Método</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Valor</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {paginatedInvoices.map(inv => {
                    const pet = MOCK_PETS.find(p => p.id === inv.petId);
                    return (
                      <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={pet?.photo} className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-50" />
                            <div>
                              <p className="font-bold text-slate-800 text-sm leading-tight">{pet?.name}</p>
                              <p className="text-[10px] text-slate-400 font-medium">{inv.month}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-500 font-medium">{inv.dueDate}</td>
                        <td className="px-6 py-4">
                          <Badge variant="neutral" className="text-[9px] lowercase">
                            {inv.paymentMethod}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-800 text-sm">R$ {inv.value.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <Badge 
                            variant={inv.status === 'Pago' ? 'success' : inv.status === 'Pendente' ? 'warning' : 'danger'}
                            pulse={inv.status !== 'Pago'}
                          >
                            {inv.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {inv.status !== 'Pago' ? (
                              <Button 
                                variant="primary" 
                                size="sm" 
                                className="h-8 rounded-lg text-[10px]"
                                onClick={() => handleOpenPayment(inv)}
                              >
                                Pagar
                              </Button>
                            ) : (
                              <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors" title="Ver Comprovante">
                                <Download size={18} />
                              </button>
                            )}
                            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors" title="Ver Detalhes">
                              <Eye size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {filteredInvoices.length === 0 && (
              <div className="p-12 text-center">
                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                  <Filter size={24} />
                </div>
                <p className="text-slate-500 font-medium">Nenhuma fatura encontrada para este filtro.</p>
              </div>
            )}
          </div>

          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
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
    </div>
  );
};

// Fixed: Added default export to resolve "Module has no default export" error in App.tsx
export default Billing;
