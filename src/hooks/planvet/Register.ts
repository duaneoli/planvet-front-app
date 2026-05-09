import { AuthService } from "@/api/planvet/services/AuthService";
import { useMutation } from "@tanstack/react-query";

export class UseRegisterService {
  static useCreate() {
    return useMutation({
      mutationFn: (data: Parameters<typeof AuthService.register>[0]) =>
        AuthService.register(data),
    });
  }
}
