import { CityResponseDTO } from "@/api/planvet/dto/response/CityResponseDTO";
import { StateResponseDTO } from "@/api/planvet/dto/response/StateResponseDTO";

export enum AccessLevelEnum {
  "ADMIN" = "ADMIN",
  "CLI" = "CLI",
}
export type UserResponseDTO = {
  id: number;
  userId: number;
  companyId: number;
  microFranchiseId: number;
  condominiumId: number;
  accessLevel: AccessLevelEnum;
  fullName: string;
  cpf: string;
  rg: string;
  phone: string;
  cellPhone: string;
  gender: string;
  birthDate: string;
  street: string;
  streetNumber: string;
  streetComplement: string;
  neighborhood: string;
  cep: string;
  cityId: number;
  stateId: number;
  latitude: string;
  longitude: string;
  active: boolean;
  additionalNotes: string;
  updatedAt: Date;
  city?: CityResponseDTO;
  state?: StateResponseDTO;
};
