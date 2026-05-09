import { PlanvetApi } from "@/api/planvet";
import { RegisterRequestDTO } from "@/api/planvet/dto/request/RegisterRequestDTO";
import { LoginResponseDTO } from "@/api/planvet/dto/response/LoginResponseDTO";

export class AuthService extends PlanvetApi {
  static async register(data: RegisterRequestDTO): Promise<LoginResponseDTO> {
    const response = await PlanvetApi.client.post<LoginResponseDTO>(
      PlanvetApi.router.auth.register,
      data
    );
    return response.data;
  }

  static async login(email: string, password: string) {
    const response = await PlanvetApi.client.post<LoginResponseDTO>(PlanvetApi.router.auth.login, {
      email,
      password,
    });
    return response.data;
  }

  static async me() {
    const response = await PlanvetApi.client.get<LoginResponseDTO>(PlanvetApi.router.auth.me);
    return response.data;
  }

  static async refresh() {
    const response = await PlanvetApi.client.post<LoginResponseDTO>(PlanvetApi.router.auth.refresh);
    return response.data;
  }

  static async phpToken(token: string) {
    const response = await PlanvetApi.client.post<LoginResponseDTO>(
      PlanvetApi.router.auth.php,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
}
