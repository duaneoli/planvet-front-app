import { BreedService } from "@/api/planvet/services/BreedService";
import { useQuery } from "@tanstack/react-query";

export class UseBreedService {
  static useGetBySpecie(specieId: number) {
    return useQuery({
      queryKey: ["breeds", specieId],
      queryFn: () => BreedService.getBySpecie(specieId),
      staleTime: Infinity,
      enabled: !!specieId,
      refetchOnWindowFocus: false, // Impede buscar ao clicar na tela/aba
      refetchOnMount: false, // Impede buscar ao abrir o componente (StepThree)
      refetchOnReconnect: false, // Impede buscar se a rede oscilar
      networkMode: "offlineFirst", // Ele prioriza o cache mesmo com rede ativa
    });
  }
}
