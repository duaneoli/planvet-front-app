import { MOCK_CONTRACTS, MOCK_INVOICES, MOCK_PETS, MOCK_USER } from "@/constants";
import { Contract, Invoice, Pet, UserProfile } from "@/types";

// Simulador de delay de rede
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// Simulação de "Database" local para persistência na sessão
let dbPets = [...MOCK_PETS];

/**
 * Mapeamento de rotas (Simulando um padrão de backend real)
 * Facilita a manutenção caso os endpoints mudem.
 */
export const API_ENDPOINTS = {
  PETS: "/pets",
  INVOICES: "/billing/invoices",
  CONTRACTS: "/contracts",
};

/**
 * Service Layer: Camada pura de comunicação com o servidor
 */
export const api = {
  auth: {
    validateSession: async (email: string): Promise<UserProfile> => {
      await delay(1500); // Simulando latência de verificação de token no servidor
      // Em um cenário real, aqui verificaríamos o JWT.
      // Se o e-mail for o do nosso mock, consideramos válido.
      if (email) {
        return { ...MOCK_USER, email };
      }
      throw new Error("Sessão expirada ou inválida");
    }
  },
  // --- PETS SERVICE ---
  pets: {
    getAll: async (): Promise<Pet[]> => {
      await delay(800);
      return [...dbPets];
    },
    getById: async (id: string): Promise<Pet | undefined> => {
      await delay(400);
      return dbPets.find((p) => p.id === id);
    },
    create: async (pet: Pet): Promise<Pet> => {
      await delay(1000);
      dbPets = [pet, ...dbPets];
      return pet;
    },
    delete: async (id: string): Promise<void> => {
      await delay(500);
      dbPets = dbPets.filter((p) => p.id !== id);
    },
    update: async (id: string, data: Partial<Pet>): Promise<Pet> => {
      await delay(600);
      dbPets = dbPets.map((p) => (p.id === id ? { ...p, ...data } : p));
      return dbPets.find((p) => p.id === id)!;
    },
  },

  // --- BILLING SERVICE ---
  billing: {
    getInvoices: async (): Promise<Invoice[]> => {
      await delay(600);
      return [...MOCK_INVOICES];
    },
  },

  // --- CONTRACTS SERVICE ---
  contracts: {
    getAll: async (): Promise<Contract[]> => {
      await delay(700);
      return [...MOCK_CONTRACTS];
    },
  },
};
