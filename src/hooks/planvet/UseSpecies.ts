import { AnimalService } from "@/api/planvet/services/animal/AnimalService";
import { useQuery } from "@tanstack/react-query";

export class UseSpeciesService {
  static useGetAll() {
    return useQuery({
      queryKey: ["species"],
      queryFn: AnimalService.getSpecies,
      staleTime: Infinity,
    });
  }
}
