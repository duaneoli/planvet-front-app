
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';
import { Pet } from '../types';

/**
 * Padrão de chaves de query centralizado para evitar erros de digitação
 */
export const PET_KEYS = {
  all: ['pets'] as const,
  detail: (id: string) => ['pets', id] as const,
};

export const usePets = () => {
  return useQuery({
    queryKey: PET_KEYS.all,
    queryFn: api.pets.getAll,
  });
};

export const usePetDetail = (id: string) => {
  return useQuery({
    queryKey: PET_KEYS.detail(id),
    queryFn: () => api.pets.getById(id),
    enabled: !!id,
  });
};

export const useAddPet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.pets.create,
    onSuccess: () => {
      // Invalida e atualiza o cache de pets globalmente
      queryClient.invalidateQueries({ queryKey: PET_KEYS.all });
    },
  });
};

export const useDeletePet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.pets.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PET_KEYS.all });
    },
  });
};

export const useUpdatePet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<Pet> }) => api.pets.update(id, data),
    onSuccess: (updatedPet) => {
      queryClient.invalidateQueries({ queryKey: PET_KEYS.all });
      queryClient.invalidateQueries({ queryKey: PET_KEYS.detail(updatedPet.id) });
    },
  });
};
