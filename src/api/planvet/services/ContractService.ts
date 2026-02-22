import { PlanvetApi } from "@/api/planvet";
import { AnimalMinifyResponseDTO } from "@/api/planvet/dto/animal.response.dto";
import { ContractMinifyResponseDTO } from "@/api/planvet/dto/contract.response.dto";
import { PlanMinifyrResponseDTO } from "@/api/planvet/dto/plan.response.dto";
import { DueDateType, PaymentMethodType } from "@/types";

class UserContractService extends PlanvetApi {
  static async getAll(): Promise<
    Array<
      ContractMinifyResponseDTO & { plan: PlanMinifyrResponseDTO; animal: AnimalMinifyResponseDTO }
    >
  > {
    const response = await PlanvetApi.client.get(PlanvetApi.router.contracts.user.getAll);
    return response.data;
  }
}

export class ContractService extends PlanvetApi {
  static user = UserContractService;

  static async created(data: {
    email?: string;
    cpf?: string;
    fullName?: string;
    password?: string;
    confirmPassword?: string;
    petName?: string;
    petBirthDate?: string;
    petSpecies?: any;
    petBreed?: string;
    paymentMethod?: PaymentMethodType;
    dueDate?: DueDateType | undefined | null;
  }): Promise<{
    id: number;
    email?: string;
    cpf?: string;
    fullName?: string;
    password?: string;
    confirmPassword?: string;
    petName?: string;
    petBirthDate?: string;
    petSpecies?: any;
    petBreed?: string;
    paymentMethod?: PaymentMethodType;
    dueDate?: DueDateType | undefined | null;
  }> {
    return PlanvetApi.client.post(PlanvetApi.router.register.sign_up, data);
  }
}
