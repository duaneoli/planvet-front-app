import { UserAnimalService } from "@/api/planvet/services/animal/UserAnimalService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export class UseAnimalService {
  static useGetAll() {
    return useQuery({
      queryKey: ["animals"],
      queryFn: UserAnimalService.getAll,
      staleTime: Infinity,
    });
  }

  static useGetById(id: number) {
    return useQuery({
      queryKey: ["animals", id],
      queryFn: () => UserAnimalService.getById(id),
      staleTime: Infinity,
      enabled: !!id,
    });
  }

  static useCreate() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data: Parameters<typeof UserAnimalService.create>[0]) =>
        UserAnimalService.create(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["animals"] });
      },
    });
  }
}
