import { PlanvetApi } from "@/api/planvet";
import { CreateAnimalRequestDTO } from "@/api/planvet/dto/request/CreateAnimalRequestDTO";
import { AnimalResponseDTO } from "@/api/planvet/dto/response/AnimalResponseDTO";

export class UserAnimalService extends PlanvetApi {
  static async create(data: CreateAnimalRequestDTO): Promise<AnimalResponseDTO> {
    const response = await PlanvetApi.client.post<AnimalResponseDTO>(
      PlanvetApi.router.users.animals.list,
      data
    );
    return response.data;
  }

  static async getAll(): Promise<AnimalResponseDTO[]> {
    const response = await PlanvetApi.client.get<AnimalResponseDTO[]>(
      PlanvetApi.router.users.animals.list
    );
    return response.data;
  }

  static async getById(id: number): Promise<AnimalResponseDTO> {
    const response = await PlanvetApi.client.get<AnimalResponseDTO>(
      PlanvetApi.router.users.animals.get(id)
    );
    return response.data;
  }
}
