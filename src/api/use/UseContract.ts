import { ContractService } from "@/api/services/ContractService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export class UseContractService {
    static useGetAll() {
        return useQuery({
            queryKey: ["contracts"],
            queryFn: ContractService.getAll,
            staleTime: Infinity
        });
    }

    static useCreate() {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data: Parameters<typeof ContractService.created>[0]) => ContractService.created(data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["contracts"] });
            },
            onError: (error) => {
                console.error("Erro ao criar:", error);
            }
        });
    }

}