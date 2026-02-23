import { ContractResponseDTO } from "@/api/planvet/dto/response/ContractResponseDTO";
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
  status: "pg" | "ab" | "ca";
  settlementNote: string;
  timestamp: Date;
  contract?: ContractResponseDTO;
};

export const InvoiceResponseMapped = {
  status: (status: "pg" | "ab" | "ca") => {
    if (status === "pg") return "Pago";
    if (status === "ab") return "Pendente";
    if (status === "ca") return "Cancelado";
    return "Error";
  },
  statusBadge: (status: "pg" | "ab" | "ca") => {
    if (status === "pg") return "success";
    if (status === "ab") return "warning";
    if (status === "ca") return "info";
    return undefined;
  },
};
