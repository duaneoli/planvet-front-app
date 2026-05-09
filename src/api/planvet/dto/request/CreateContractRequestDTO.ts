import { PaymentMethodType } from "@/api/planvet/dto/response/ContractResponseDTO";

export type CreateContractRequestDTO = {
  dueCycleDay: 1 | 5 | 10 | 15 | 20 | 25;
  animalId: number;
  planId: number;
  paymentMethod: PaymentMethodType;
};
