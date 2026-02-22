export type ContractMinifyResponseDTO = {
  id: number;
  contractNumber: number;
  userId: number;
  animalId: number;
  paymentMethod: string;
  status: string;
  statusDetail: string;
  renewal: number;
  startDate: string;
  endDate: string;
  cancellationDate: string;
  dueCycleDay: "1" | "5" | "10" | "15" | "20" | "25";
  createdAt: string;
  updatedAt: string;
};
