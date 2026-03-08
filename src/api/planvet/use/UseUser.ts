import { UserServices } from "@/api/planvet/services/UserService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

class UseByUser {
  static me() {
    return useQuery({
      queryKey: ["me"],
      queryFn: UserServices.me,
      staleTime: Infinity,
    });
  }

  static card() {
    return useQuery({
      queryKey: ["me", "card"],
      queryFn: UserServices.card,
      staleTime: Infinity,
    });
  }

  static update() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (data: Parameters<typeof UserServices.update>[0]) => UserServices.update(data),
      onSuccess: (data) => {
        queryClient.setQueryData(["me"], data);
      },
      onError: (error) => {
        toast.error("Error ao atualizar informações do usuário");
      },
    });
  }
}

export class UseUserService {
  static user = UseByUser;
}
