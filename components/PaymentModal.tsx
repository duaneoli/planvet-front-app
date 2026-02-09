
import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { QrCode, Copy, Check, Barcode } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: any;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, invoice }) => {
  const [copied, setCopied] = React.useState(false);

  if (!invoice) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Pagamento - ${invoice.month}`}>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <p className="text-sm text-slate-500 uppercase font-bold">Valor a pagar</p>
          <p className="text-4xl font-black text-slate-800">R$ {invoice.value.toFixed(2)}</p>
        </div>

        {invoice.paymentMethod === 'PIX' ? (
          <div className="space-y-4">
            <div className="bg-emerald-50 p-6 rounded-2xl flex flex-col items-center justify-center border border-emerald-100">
              <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
                <QrCode size={180} className="text-slate-800" />
              </div>
              <p className="text-xs text-emerald-700 font-medium text-center px-4">
                Escaneie o QR Code acima no app do seu banco para pagar instantaneamente.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Copia e Cola</label>
              <div className="relative">
                <input 
                  readOnly 
                  value={invoice.pixKey || ''}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-mono text-slate-500 pr-12 outline-none"
                />
                <button 
                  onClick={() => handleCopy(invoice.pixKey || '')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
            </div>
          </div>
        ) : invoice.paymentMethod === 'Boleto' ? (
          <div className="space-y-4">
            <div className="bg-slate-50 p-6 rounded-2xl flex flex-col items-center justify-center border border-slate-200">
              <Barcode size={64} className="text-slate-400 mb-2" />
              <p className="text-sm font-bold text-slate-700">Boleto Bancário</p>
              <p className="text-xs text-slate-500">Vencimento em {invoice.dueDate}</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Linha Digitável</label>
              <div className="relative">
                <input 
                  readOnly 
                  value="34191.09008 63561.952014 21711.600006 1 95920000012990"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-mono text-slate-500 pr-12 outline-none"
                />
                <button 
                  onClick={() => handleCopy("34191.09008 63561.952014 21711.600006 1 95920000012990")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
            </div>
            
            <Button variant="outline" className="w-full" icon={<Copy size={16} />}>
              Baixar PDF do Boleto
            </Button>
          </div>
        ) : (
          <div className="bg-blue-50 p-6 rounded-2xl text-center border border-blue-100">
            <p className="text-sm text-blue-700 font-medium">
              Esta fatura será cobrada automaticamente no seu cartão final <strong>{invoice.cardLastDigits || '4589'}</strong> no dia do vencimento.
            </p>
          </div>
        )}

        <Button onClick={onClose} variant="primary" className="w-full">
          Entendi
        </Button>
      </div>
    </Modal>
  );
};

export default PaymentModal;
