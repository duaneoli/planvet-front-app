import { PlanvetApi } from "@/api/planvet";
import { UserCardResponseDTO } from "@/api/planvet/dto/response/UserCardResponseDTO";
import { UserResponseDTO } from "@/api/planvet/dto/response/UserResponseDTO";

export class UserServices extends PlanvetApi {
  static async me() {
    const response = await PlanvetApi.client.get<UserResponseDTO>(PlanvetApi.router.users.me.get);
    return response.data;
  }

  static async card() {
    const response = await PlanvetApi.client.get<UserCardResponseDTO>(
      PlanvetApi.router.users.me.card
    );
    return response.data;
  }

  static async update(data: {
    fullName?: string;
    phone?: string;
    cellPhone?: string;
    gender?: string;
    birthDate?: string;
    street?: string;
    streetNumber?: number;
    streetComplement?: string;
    neighborhood?: string;
    cep?: string;
    city?: string;
    state?: string;
  }) {
    const response = await PlanvetApi.client.put<UserResponseDTO>(
      PlanvetApi.router.users.me.update,
      data
    );
    return response.data;
  }
}
