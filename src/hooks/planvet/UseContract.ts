import { UserContractService } from "@/api/planvet/services/UserContractService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

class UseByUser {
  static useGetAll() {
    return useQuery({
      queryKey: ["contracts"],
      queryFn: UserContractService.getAll,
      staleTime: Infinity,
    });
  }

  static useGetById(id: number) {
    const query = useQuery({
      queryKey: ["contracts"],
      queryFn: UserContractService.getAll,
      staleTime: Infinity,
    });
    const contract = query.data?.find((c) => c.id === id) ?? null;
    return { ...query, data: contract };
  }
}

export class UseContractService {
  static user = UseByUser;

  static useCreate() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data: Parameters<typeof UserContractService.create>[0]) =>
        UserContractService.create(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["contracts"] });
      },
    });
  }
}
