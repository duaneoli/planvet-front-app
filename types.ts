
export enum PetSpecies {
  DOG = 'Cachorro',
  CAT = 'Gato',
  BIRD = 'Pássaro',
  REPTILE = 'Répteis',
  OTHER = 'Outro'
}

export interface Pet {
  id: string;
  name: string;
  species: PetSpecies;
  breed: string;
  age: number;
  weight: number;
  photo: string;
  planId: string;
  bio?: string;
}

export interface Contract {
  id: string;
  petId: string;
  planName: string;
  status: 'Ativo' | 'Suspenso' | 'Cancelado';
  startDate: string;
  renewalDate: string;
  monthlyValue: number;
  paymentMethod: 'Cartão' | 'Boleto' | 'PIX';
}

export interface Invoice {
  id: string;
  petId: string;
  month: string;
  dueDate: string;
  value: number;
  status: 'Pago' | 'Pendente' | 'Atrasado';
  paymentMethod: 'Cartão' | 'Boleto' | 'PIX';
  link: string;
  pixKey?: string;
  barcode?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  cpf: string;
  cardLastDigits: string;
  cardBrand: string;
}
