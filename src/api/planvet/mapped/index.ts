import { ContractStatus } from "@/api/planvet/dto/contract.response.dto";

export const animalPhotoMapped = (photo: string) => photo || "/image.png";

export const paymentMethodMapped = (method: "CARD" | "BOLETO" | "PIX") => {
  if (method === "CARD") return "Cartão";
  if (method === "BOLETO") return "Boleto";
  if (method === "PIX") return "PIX";
  return "Error";
};

export const contractStatusMapped = (status: ContractStatus) => {
  if (status === "ENROLLMENT") return "Matrícula";
  if (status === "ACTIVE") return "Ativo";
  if (status === "CANCELLED") return "Cancelado";
  if (status === "CANCELLED_OPEN") return "Cancelado (aberto)";
  if (status === "CANCELLED_ENROLLMENT") return "Cancelado (matrícula)";
  if (status === "CANCELLED_DEFAULTED") return "Cancelado (atraso)";
  if (status === "CANCELLED_PAID") return "Cancelado (pago)";
  if (status === "CANCELLED_DEATH") return "Cancelado (morto)";
  if (status === "CANCELLED_NO_COST") return "Cancelado (sem custo)";
  return "Error";
};

export const contractBadgeMapped = (status: ContractStatus) => {
  if (status === "ENROLLMENT") return "badge-success";
  if (status === "ACTIVE") return "badge-success";
  if (status === "CANCELLED") return "badge-danger";
  if (status === "CANCELLED_OPEN") return "badge-danger";
  if (status === "CANCELLED_ENROLLMENT") return "badge-danger";
  if (status === "CANCELLED_DEFAULTED") return "badge-danger";
  if (status === "CANCELLED_PAID") return "badge-danger";
  if (status === "CANCELLED_DEATH") return "badge-danger";
  if (status === "CANCELLED_NO_COST") return "badge-danger";
  return "Error";
};
