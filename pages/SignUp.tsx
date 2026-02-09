
import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Dog, Mail, Lock, User, Fingerprint, 
  ChevronLeft, ArrowRight, Calendar, CreditCard, 
  QrCode, FileText, AlertTriangle, CheckCircle2,
  ShieldCheck, Info
} from 'lucide-react';
import { PetSpecies } from '../types';
import { BREEDS_BY_SPECIES } from '../constants';
import Button from '../components/Button';
import Input from '../components/Input';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // User Info
    name: '',
    email: '',
    cpf: '',
    password: '',
    // Pet Info
    petName: '',
    petBirthDate: '',
    petSpecies: PetSpecies.DOG,
    petBreed: '',
    // Contract Info
    paymentMethod: 'Cartão' as 'Cartão' | 'PIX' | 'Boleto',
    dueDate: '10'
  });

  const availableBreeds = useMemo(() => {
    return BREEDS_BY_SPECIES[formData.petSpecies] || [];
  }, [formData.petSpecies]);

  const nextStep = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (step < 3) setStep(prev => prev + 1);
  };

  const prevStep = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (step > 1) setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Trava de segurança: só processa se for o último passo
    if (step < 3) {
      nextStep();
      return;
    }

    // Simulação de finalização de contrato
    console.log('Dados Finais do Contrato:', formData);
    alert(`Contrato finalizado com sucesso!\nPet: ${formData.petName}\nPagamento: ${formData.paymentMethod}\nVencimento: Dia ${formData.dueDate}`);
    navigate('/login');
  };

  // Previne que o "Enter" submeta o formulário nas etapas 1 e 2
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && step < 3) {
      e.preventDefault();
      // Se os campos da etapa atual estiverem válidos, avança
      const isStep1Valid = step === 1 && formData.name && formData.email && formData.cpf && formData.password;
      const isStep2Valid = step === 2 && formData.petName && formData.petBreed && formData.petBirthDate;
      
      if (isStep1Valid || isStep2Valid) {
        nextStep();
      }
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8 max-w-sm mx-auto">
      {[1, 2, 3].map((s) => (
        <React.Fragment key={s}>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
              step >= s 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
                : 'bg-slate-200 text-slate-400'
            }`}>
              {step > s ? <CheckCircle2 size={20} /> : s}
            </div>
            <span className={`text-[10px] mt-2 font-bold uppercase tracking-tighter ${step >= s ? 'text-emerald-700' : 'text-slate-400'}`}>
              {s === 1 ? 'Tutor' : s === 2 ? 'Pet' : 'Plano'}
            </span>
          </div>
          {s < 3 && (
            <div className={`flex-1 h-0.5 mx-2 -mt-6 rounded-full transition-colors duration-500 ${
              step > s ? 'bg-emerald-600' : 'bg-slate-200'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3">
            <div className="bg-emerald-600 p-2.5 rounded-2xl text-white shadow-xl rotate-3">
              <Dog size={28} />
            </div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">PetLife</h2>
          </div>
        </div>

        {renderStepIndicator()}

        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100 relative overflow-hidden">
          <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-8">
            
            {/* ETAPA 1: DADOS DO TUTOR */}
            {step === 1 && (
              <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                <div className="text-center mb-4">
                  <h1 className="text-2xl font-bold text-slate-800">Crie sua conta</h1>
                  <p className="text-slate-500 text-sm">Insira seus dados para começar a proteção.</p>
                </div>
                
                <Input 
                  label="Nome Completo"
                  icon={<User size={18} />}
                  placeholder="Nome e sobrenome"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required
                />
                
                <Input 
                  label="E-mail"
                  type="email"
                  icon={<Mail size={18} />}
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    label="CPF"
                    icon={<Fingerprint size={18} />}
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={e => setFormData({...formData, cpf: e.target.value})}
                    required
                  />
                  <Input 
                    label="Senha"
                    type="password"
                    icon={<Lock size={18} />}
                    placeholder="Mínimo 6 dígitos"
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    required
                  />
                </div>
              </div>
            )}

            {/* ETAPA 2: DADOS DO PET */}
            {step === 2 && (
              <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                <div className="text-center mb-4">
                  <h1 className="text-2xl font-bold text-slate-800">Dados do seu pet</h1>
                  <p className="text-slate-500 text-sm">Como é o animal que você quer proteger?</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    label="Nome do Pet"
                    icon={<Dog size={18} />}
                    placeholder="Ex: Luna"
                    value={formData.petName}
                    onChange={e => setFormData({...formData, petName: e.target.value})}
                    required
                  />
                  <Input 
                    label="Data de Nascimento"
                    type="date"
                    icon={<Calendar size={18} />}
                    value={formData.petBirthDate}
                    onChange={e => setFormData({...formData, petBirthDate: e.target.value})}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Espécie</label>
                    <select 
                      value={formData.petSpecies}
                      onChange={e => setFormData({...formData, petSpecies: e.target.value as PetSpecies, petBreed: ''})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
                    >
                      {Object.values(PetSpecies).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Raça</label>
                    <select 
                      required
                      value={formData.petBreed}
                      onChange={e => setFormData({...formData, petBreed: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
                    >
                      <option value="">Selecione...</option>
                      {availableBreeds.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* ETAPA 3: CONTRATO E PAGAMENTO */}
            {step === 3 && (
              <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                <div className="text-center mb-2">
                  <h1 className="text-2xl font-bold text-slate-800">Pagamento e Contrato</h1>
                  <p className="text-slate-500 text-sm">Escolha a melhor forma de pagamento para você.</p>
                </div>

                {/* Resumo visual do contrato */}
                <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-3xl flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2.5 rounded-2xl shadow-sm">
                      <ShieldCheck className="text-emerald-600" size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Plano Essencial</p>
                      <p className="text-sm font-bold text-emerald-950 leading-none">Beneficiário: {formData.petName || 'Seu Pet'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-emerald-700 leading-none">R$ 89,90</p>
                    <p className="text-[9px] text-emerald-600 font-bold uppercase mt-1">por mês</p>
                  </div>
                </div>

                {/* Seletor de Métodos */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'Cartão', icon: <CreditCard size={24} /> },
                    { id: 'PIX', icon: <QrCode size={24} /> },
                    { id: 'Boleto', icon: <FileText size={24} /> },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setFormData({...formData, paymentMethod: method.id as any})}
                      className={`flex flex-col items-center justify-center p-5 rounded-[2rem] border-2 transition-all duration-300 ${
                        formData.paymentMethod === method.id 
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700 shadow-lg -translate-y-1' 
                        : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
                      }`}
                    >
                      {method.icon}
                      <span className="text-[10px] font-bold mt-2 uppercase tracking-tighter">{method.id}</span>
                    </button>
                  ))}
                </div>

                {/* Seção de Vencimento Dinâmica */}
                {(formData.paymentMethod === 'PIX' || formData.paymentMethod === 'Boleto') && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-4">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-600 uppercase flex items-center gap-2 px-1">
                          <Calendar size={14} className="text-emerald-600" /> Escolha o dia de vencimento
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[5, 10, 15, 20, 25, 28].map(d => (
                            <button
                              key={d}
                              type="button"
                              onClick={() => setFormData({...formData, dueDate: d.toString()})}
                              className={`py-2.5 rounded-2xl text-xs font-bold border transition-all ${
                                formData.dueDate === d.toString()
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-105'
                                : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300'
                              }`}
                            >
                              Dia {d}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* ALERTA DE VENCIMENTO > 15 DIAS */}
                      {Number(formData.dueDate) > 15 && (
                        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex gap-3 text-amber-800 animate-in zoom-in-95 duration-300">
                          <AlertTriangle className="shrink-0 text-amber-600" size={20} />
                          <div>
                            <p className="text-[11px] font-bold uppercase mb-1">Atenção ao Ciclo</p>
                            <p className="text-[10px] leading-relaxed font-medium">
                              Datas de vencimento após o <strong>dia 15</strong> podem gerar duas faturas no primeiro mês devido ao tempo de compensação bancária e fechamento de ciclo.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Detalhe Cartão */}
                {formData.paymentMethod === 'Cartão' && (
                  <div className="p-6 bg-blue-50 rounded-[2.5rem] border border-blue-100 flex gap-4 animate-in fade-in duration-500">
                    <div className="bg-blue-600/10 p-3 rounded-2xl h-fit">
                      <Info className="text-blue-600" size={24} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-blue-900">Assinatura Mensal</p>
                      <p className="text-[11px] text-blue-700 leading-relaxed">
                        A cobrança será automática no seu cartão. Os dados de pagamento serão solicitados com segurança após o acesso inicial ao painel.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* BOTÕES DE NAVEGAÇÃO */}
            <div className="flex gap-4 pt-4">
              {step > 1 && (
                <button 
                  type="button" 
                  onClick={prevStep}
                  className="flex-1 py-4 px-6 rounded-2xl border-2 border-slate-100 text-slate-500 font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group"
                >
                  <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                  <span>Voltar</span>
                </button>
              )}
              
              {step < 3 ? (
                <button 
                  type="button" 
                  onClick={nextStep}
                  disabled={
                    (step === 1 && (!formData.name || !formData.email || !formData.cpf || !formData.password)) ||
                    (step === 2 && (!formData.petName || !formData.petBreed || !formData.petBirthDate))
                  }
                  className="flex-[2] bg-emerald-600 text-white py-4 px-6 rounded-2xl font-bold shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 group"
                >
                  <span>Próximo Passo</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button 
                  type="submit" 
                  className="flex-[2] bg-slate-900 text-white py-4 px-6 rounded-2xl font-bold shadow-xl hover:bg-black transition-all flex items-center justify-center gap-2 group"
                >
                  <ShieldCheck size={20} className="group-hover:scale-110 transition-transform" />
                  <span>Finalizar Assinatura</span>
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="mt-8 text-center space-y-6">
          <p className="text-xs text-slate-400">
            Protegido por criptografia de ponta a ponta. Ao continuar você aceita nossos termos.
          </p>
          <div className="pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-600">
              Já tem conta? <Link to="/login" className="text-emerald-600 font-black hover:underline tracking-tight ml-1">FAZER LOGIN</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
