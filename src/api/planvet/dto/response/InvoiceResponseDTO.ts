import { ContractResponseDTO } from "@/api/planvet/dto/ContractResponseDTO";
import { PaymentMethodType } from "@/types";

export type InvoiceResponseDTO = {
  id: number;
  contractId: number;
  renewal: number;
  type: number;
  installmentNumber: number;
  paymentMethod: PaymentMethodType;
  transactionCode: string;
  barcode: string;
  paymentLink: string;
  processingDate: string;
  originalDate: string;
  dueDate: string;
  settlementDate: string | null;
  paymentDate: string | null;
  originalAmount: string;
  fine: string;
  interest: string;
  amount: string;
  description: string;
  status: string;
  settlementNote: string;
  timestamp: Date;
  contract?: ContractResponseDTO;
};
