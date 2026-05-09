import { PlanvetApi } from "@/api/planvet";
import { CreateContractRequestDTO } from "@/api/planvet/dto/request/CreateContractRequestDTO";
import { ContractResponseDTO } from "@/api/planvet/dto/response/ContractResponseDTO";

export class UserContractService extends PlanvetApi {
  static async create(data: CreateContractRequestDTO): Promise<void> {
    await PlanvetApi.client.post(PlanvetApi.router.users.contracts.getAll, data);
  }

  static async getAll(): Promise<ContractResponseDTO[]> {
    const response = await PlanvetApi.client.get<ContractResponseDTO[]>(
      PlanvetApi.router.users.contracts.getAll
    );
    return response.data;
  }

  static async getById(id: number): Promise<ContractResponseDTO> {
    const response = await PlanvetApi.client.get<ContractResponseDTO>(
      PlanvetApi.router.users.contracts.get(id)
    );
    return response.data;
  }
}
