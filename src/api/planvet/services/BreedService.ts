import { PlanvetApi } from "@/api/planvet";

export class BreedService extends PlanvetApi {
  static async getBySpecie(
    specieId: number
  ): Promise<Array<{ id: number; specieId: number; name: string }>> {
    const response = await PlanvetApi.client.get(
      PlanvetApi.router.animals.species.breeds.list(specieId)
    );
    return response.data;
  }
}
