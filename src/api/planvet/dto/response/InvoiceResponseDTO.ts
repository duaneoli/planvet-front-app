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
  asaasPaymentId?: string;
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
  status: "PAID" | "OPEN" | "CANCELLED";
  settlementNote: string;
  timestamp: Date;
  contract?: ContractResponseDTO;
};

export const InvoiceResponseMapped = {
  status: (status: InvoiceResponseDTO["status"]) => {
    if (status === "PAID") return "Pago";
    if (status === "OPEN") return "Pendente";
    if (status === "CANCELLED") return "Cancelado";
    return "Error";
  },
  statusBadge: (status: InvoiceResponseDTO["status"]) => {
    if (status === "PAID") return "success";
    if (status === "OPEN") return "warning";
    if (status === "CANCELLED") return "info";
    return undefined;
  },
};
