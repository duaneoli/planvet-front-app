import { BreedResponseDTO, SpecieResponseDTO } from "@/api/planvet/dto/response/TypesDTO";

export type AnimalResponseDTO = {
  id: number;
  userId: number;
  hashCode: string;
  microChip: string;
  condoId: number;
  name: string;
  specieId: number;
  sex: "macho" | "femea" | "";
  characteristics: string;
  hasDisease: number;
  deseaseDescription: string;
  breedId: number;
  sizeId: number;
  furId: number;
  color: string;
  eyeColorId: number;
  brithDay: string;
  fatherName: string;
  motherName: string;
  photo: string;
  availableForBreeding: number;
  createdAt: string;
  updatedAt: string;
  breed: BreedResponseDTO;
  specie: SpecieResponseDTO;
};
