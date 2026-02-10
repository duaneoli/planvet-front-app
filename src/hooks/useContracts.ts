
import { useQuery } from '@tanstack/react-query';
import { api } from '../api';

export const CONTRACT_KEYS = {
  all: ['contracts'] as const,
};

export const useContracts = () => {
  return useQuery({
    queryKey: CONTRACT_KEYS.all,
    queryFn: api.contracts.getAll,
  });
};
