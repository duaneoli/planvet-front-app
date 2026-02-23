import { AnimalResponseDTO } from "@/api/planvet/dto/response/AnimalResponseDTO";
import { PlanResponseDTO } from "@/api/planvet/dto/response/planResponseDTO";

export type ContractStatusType =
  | "ENROLLMENT"
  | "ACTIVE"
  | "CANCELLED"
  | "CANCELLED_OPEN"
  | "CANCELLED_ENROLLMENT"
  | "CANCELLED_DEFAULTED"
  | "CANCELLED_PAID"
  | "CANCELLED_DEATH"
  | "CANCELLED_NO_COST"
  | "IN_NEGOTIATION";

export type PaymentMethodType = "BOLETO" | "CARD" | "PIX";

export type ContractResponseDTO = {
  id: number;
  contractNumber: number;
  userId: number;
  animalId: number;
  planId: number;
  companyId: number;
  sellerId: number;
  microfranchiseId: number;
  installments: number;
  signupFee: number;
  embedFeeInFirstInstallment: number;
  paymentMethod: PaymentMethodType;
  status: ContractStatusType;
  statusDetail: string;
  renewal: number;
  startDate: string;
  endDate: string;
  cancellationDate: string;
  dueCycleDay: "1" | "5" | "10" | "15" | "20" | "25";
  note: string;
  createdAt: string;
  updatedAt: Date;
  plan?: PlanResponseDTO;
  animal?: AnimalResponseDTO;
};
