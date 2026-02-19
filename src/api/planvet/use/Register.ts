import { RegisterService } from "@/api/planvet/services/RegisterService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export class UseRegisterService {
  static useCreate() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data: Parameters<typeof RegisterService.created>[0]) =>
        RegisterService.created(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["register"] });
      },
      onError: (error) => {
        console.log(error);
        console.error("Erro ao criar:", error);
      },
    });
  }
}
