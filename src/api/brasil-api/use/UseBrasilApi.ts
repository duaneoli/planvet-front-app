import { BrasilApiService, EstadoType } from "@/api/brasil-api/services/BrasilApiService";
import { useQuery } from "@tanstack/react-query";

export class UseBrasilApiService {
    static useGetAddressByCep(cep: string) {
        return useQuery({
            queryKey: ["brasil-api-adress", cep],
            queryFn: () => BrasilApiService.getAddressByCep(cep),
            staleTime: Infinity,
            enabled: cep?.length === 9
        });
    }

    //obter todos os estados do brasil e não apagar a cache
    static useGetStates() {
        return useQuery({
            queryKey: ["brasil-api-states"],
            queryFn: BrasilApiService.getStates,
            staleTime: Infinity,
            enabled: false,
            initialData: []
        });
    }

    //obter todos as cidades de um estado
    static useGetCities(sigra: EstadoType['sigla']) {
        return useQuery({
            queryKey: ["brasil-api-cities", sigra],
            queryFn: () => BrasilApiService.getCities(sigra),
            staleTime: Infinity,
            enabled: !!sigra
        });
    }
}