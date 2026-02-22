import { PlanvetApi } from "@/api/planvet";

export class AuthService extends PlanvetApi {
  static async login(email: string, password: string) {
    return await PlanvetApi.client.post(PlanvetApi.router.auth.login, {
      email,
      password,
    });
  }
}
