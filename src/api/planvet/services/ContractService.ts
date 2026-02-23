import { PlanvetApi } from "@/api/planvet";
import { AnimalResponseDTO } from "@/api/planvet/dto/response/AnimalResponseDTO";
import { ContractResponseDTO } from "@/api/planvet/dto/response/ContractResponseDTO";
import { PlanResponseDTO } from "@/api/planvet/dto/response/planResponseDTO";
import { DueDateType, PaymentMethodType } from "@/types";

class UserContractService extends PlanvetApi {
  static async getAll(): Promise<
    Array<ContractResponseDTO & { plan: PlanResponseDTO; animal: AnimalResponseDTO }>
  > {
    const response = await PlanvetApi.client.get(PlanvetApi.router.users.contracts.getAll);
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
