export type ContractStatus =
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

export type ContractMinifyResponseDTO = {
  id: number;
  contractNumber: number;
  userId: number;
  animalId: number;
  paymentMethod: "CARD" | "BOLETO" | "PIX";
  status: ContractStatus;
  statusDetail: string;
  renewal: number;
  startDate: string;
  endDate: string;
  cancellationDate: string;
  dueCycleDay: "1" | "5" | "10" | "15" | "20" | "25";
  createdAt: string;
  updatedAt: string;
};
