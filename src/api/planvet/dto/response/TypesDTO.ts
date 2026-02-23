export type BreedResponseDTO = {
  id: number;
  name: string;
  specieId: number;
};

export type SpecieResponseDTO = {
  id: number;
  name: string;
};

export type ResponsePaginationDTO<T = any> = {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  data: T[];
};
