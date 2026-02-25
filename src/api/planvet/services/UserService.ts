import { PlanvetApi } from "@/api/planvet";
import { UserResponseDTO } from "@/api/planvet/dto/response/UserResponseDTO";

export class UserServices extends PlanvetApi {
  static async me() {
    const response = await PlanvetApi.client.get<UserResponseDTO>(PlanvetApi.router.users.me.get);
    return response.data;
  }
}
