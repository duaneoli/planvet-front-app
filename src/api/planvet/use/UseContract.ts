import { ContractService } from "@/api/planvet/services/ContractService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

class UseByUser {
  static useGetAll() {
    return useQuery({
      queryKey: ["contracts"],
      queryFn: ContractService.user.getAll,
      staleTime: Infinity,
    });
  }
}

export class UseContractService {
  static user = UseByUser;
  static useCreate() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data: Parameters<typeof ContractService.created>[0]) =>
        ContractService.created(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["contracts"] });
      },
      onError: (error) => {
        console.error("Erro ao criar:", error);
      },
    });
  }
}
