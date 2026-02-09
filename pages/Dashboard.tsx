
import React from 'react';
import { MOCK_PETS, MOCK_INVOICES } from '../constants';
import { ChevronRight, Heart, ShieldCheck, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from '../components/Badge';

const Dashboard: React.FC = () => {
  const pendingInvoice = MOCK_INVOICES.find(inv => inv.status === 'Pendente');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Resumo da Saúde</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-emerald-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-200">
            <div className="flex justify-between items-start mb-4">
              <ShieldCheck size={28} />
              <Badge variant="neutral" className="bg-white/20 text-white border-transparent">Planos Ativos</Badge>
            </div>
            <p className="text-3xl font-bold">02</p>
            <p className="text-emerald-100 text-sm mt-1">Pets protegidos com o melhor cuidado.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <Heart className="text-rose-500" size={28} />
              <Link to="/pets" className="text-emerald-600 text-xs font-semibold hover:underline">Ver todos</Link>
            </div>
            <p className="text-3xl font-bold text-slate-800">{MOCK_PETS.length}</p>
            <p className="text-slate-500 text-sm mt-1">Pets cadastrados no sistema.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <Calendar className="text-blue-500" size={28} />
              <Link to="/billing" className="text-emerald-600 text-xs font-semibold hover:underline">Ir para faturas</Link>
            </div>
            <p className="text-3xl font-bold text-slate-800">
              {pendingInvoice ? `R$ ${pendingInvoice.value.toFixed(2)}` : 'Em dia'}
            </p>
            <p className="text-slate-500 text-sm mt-1">
              {pendingInvoice ? `Vencimento em ${pendingInvoice.dueDate}` : 'Nenhuma fatura pendente.'}
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-slate-800">Meus Pets</h3>
            <Link to="/pets" className="text-emerald-600 text-sm font-medium flex items-center">
              Gerenciar <ChevronRight size={16} />
            </Link>
          </div>
          <div className="space-y-3">
            {MOCK_PETS.map(pet => (
              <Link to={`/pets/${pet.id}/social`} key={pet.id} className="bg-white p-4 rounded-xl border border-slate-100 flex items-center space-x-4 hover:shadow-md transition-shadow cursor-pointer">
                <img src={pet.photo} alt={pet.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-50" />
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800">{pet.name}</h4>
                  <p className="text-xs text-slate-500">{pet.species} • {pet.breed}</p>
                </div>
                <Badge variant="success">Gold</Badge>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-slate-800">Últimas Faturas</h3>
            <Link to="/billing" className="text-emerald-600 text-sm font-medium flex items-center">
              Histórico <ChevronRight size={16} />
            </Link>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3 font-semibold text-slate-600">Referência</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">Valor</th>
                  <th className="px-4 py-3 font-semibold text-slate-600 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_INVOICES.slice(0, 3).map(inv => (
                  <tr key={inv.id} className="border-b border-slate-50 last:border-0">
                    <td className="px-4 py-3 font-medium text-slate-800">{inv.month}</td>
                    <td className="px-4 py-3 text-slate-600">R$ {inv.value.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right">
                      <Badge variant={inv.status === 'Pago' ? 'success' : 'warning'}>{inv.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
