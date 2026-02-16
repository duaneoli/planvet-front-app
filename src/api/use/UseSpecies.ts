import { SpeciesServices } from "@/api/services/SpeciesService";
import { useQuery } from "@tanstack/react-query";

export class UseSpeciesService {
    static useGetAll() {
        return useQuery({
            queryKey: ["species"],
            queryFn: SpeciesServices.getAll,
            staleTime: Infinity
        });
    }
}