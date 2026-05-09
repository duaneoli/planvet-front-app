import { PlanvetApi } from "@/api/planvet";
import { BreedResponseDTO, SpecieResponseDTO } from "@/api/planvet/dto/response/TypesDTO";

export class AnimalService extends PlanvetApi {
  static async getSpecies(): Promise<SpecieResponseDTO[]> {
    const response = await PlanvetApi.client.get<SpecieResponseDTO[]>(
      PlanvetApi.router.animals.species.list
    );
    return response.data;
  }

  static async getBreeds(specieId: number): Promise<BreedResponseDTO[]> {
    const response = await PlanvetApi.client.get<BreedResponseDTO[]>(
      PlanvetApi.router.animals.species.breeds.list(specieId)
    );
    return response.data;
  }
}
