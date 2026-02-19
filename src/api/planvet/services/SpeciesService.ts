import { PlanvetApi } from "@/api/planvet";

export class SpeciesServices extends PlanvetApi {
  static async getAll(): Promise<Array<{ id: string; name: string }>> {
    const response = await PlanvetApi.client.get<Array<{ id: string; name: string }>>(
      PlanvetApi.router.animals.species.list
    );
    return response.data;
  }
}
