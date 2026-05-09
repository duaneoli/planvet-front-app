import { AnimalService } from "@/api/planvet/services/animal/AnimalService";
import { useQuery } from "@tanstack/react-query";

export class UseBreedService {
  static useGetBySpecie(specieId: number) {
    return useQuery({
      queryKey: ["breeds", specieId],
      queryFn: () => AnimalService.getBreeds(specieId),
      staleTime: Infinity,
      enabled: !!specieId,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      networkMode: "offlineFirst",
    });
  }
}
