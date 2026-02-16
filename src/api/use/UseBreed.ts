import { BreedService } from "@/api/services/BreedService";
import { useQuery } from "@tanstack/react-query";

export class UseBreedService {
    static useGetBySpecie(specieId: number) {
        return useQuery({
            queryKey: ["breeds", specieId],
            queryFn: () => BreedService.getBySpecie(specieId),
            staleTime: Infinity,
            enabled: !!specieId
        });
    }
}