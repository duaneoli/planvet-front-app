import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/modal/Modal";
import { UserProfile } from "@/types";
import { CreditCard, Lock, ShieldCheck } from "lucide-react";
import React, { useState } from "react";

interface CreditCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onSave: (updatedUser: UserProfile) => void;
}

const CreditCardModal: React.FC<CreditCardModalProps> = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    cardNumber: `•••• •••• •••• ${user.cardLastDigits}`,
    expiry: "12/28",
    cvv: "•••",
    brand: user.cardBrand,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulando salvamento
    setTimeout(() => {
      onSave({
        ...user,
        name: formData.name,
        cardBrand: formData.brand,
      });
      setIsSaving(false);
      onClose();
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Gerenciar Cartão de Crédito">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Visual Card Preview */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden mb-6">
          <div className="flex justify-between items-start mb-8">
            <ShieldCheck className="text-emerald-400" size={28} />
            <p className="text-[10px] font-bold tracking-widest uppercase opacity-60">
              {formData.brand}
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-lg tracking-[0.2em] font-mono">{formData.cardNumber}</p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[8px] uppercase opacity-50 font-bold tracking-tighter">
                  Titular
                </p>
                <p className="text-xs font-semibold truncate max-w-[150px]">
                  {formData.name.toUpperCase()}
                </p>
              </div>
              <div>
                <p className="text-[8px] uppercase opacity-50 font-bold tracking-tighter">
                  Validade
                </p>
                <p className="text-xs font-semibold">{formData.expiry}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            label="Nome no Cartão"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Como impresso no cartão"
          />

          <Input
            label="Número do Cartão"
            value={formData.cardNumber}
            onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
            placeholder="0000 0000 0000 0000"
            icon={<CreditCard size={18} />}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Validade"
              value={formData.expiry}
              onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
              placeholder="MM/AA"
            />
            <Input
              label="CVV"
              type="password"
              value={formData.cvv}
              onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
              placeholder="123"
              icon={<Lock size={16} />}
            />
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl flex gap-3 border border-blue-100">
          <ShieldCheck className="text-blue-500 shrink-0" size={18} />
          <p className="text-[10px] text-blue-700 leading-tight">
            Seus dados são criptografados e armazenados com segurança padrão PCI-DSS. Nós não temos
            acesso ao número completo do seu cartão.
          </p>
        </div>

        <div className="flex gap-3">
          <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" className="flex-1" isLoading={isSaving}>
            Salvar Alterações
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreditCardModal;
