import { Contract, Invoice, Pet, PetSpecies, UserProfile } from "@/types";

export const BREEDS_BY_SPECIES: Record<string, Array<{ id: number; breed: string }>> = {
  1: [
    { id: 1, breed: "Beagle" },
    { id: 2, breed: "Bulldog" },
    { id: 3, breed: "Golden Retriever" },
    { id: 4, breed: "Labrador" },
    { id: 5, breed: "Poodle" },
    { id: 6, breed: "Pug" },
    { id: 7, breed: "SRD (Vira-lata)" },
    { id: 8, breed: "Yorkshire" },
  ],
  2: [
    { id: 1, breed: "Persa" },
    { id: 2, breed: "Siamês" },
    { id: 3, breed: "Maine Coon" },
    { id: 4, breed: "Angorá" },
    { id: 5, breed: "Bengal" },
    { id: 6, breed: "SRD (Vira-lata)" },
  ],
  3: [
    { id: 1, breed: "Calopsita" },
    { id: 2, breed: "Canário" },
    { id: 3, breed: "Papagaio" },
    { id: 4, breed: "Periquito" },
  ],
  4: [
    { id: 1, breed: "Iguana" },
    { id: 2, breed: "Jabuti" },
    { id: 3, breed: "Tartaruga" },
  ],
  5: [
    { id: 1, breed: "Hamster" },
    { id: 2, breed: "Coelho" },
    { id: 3, breed: "Porquinho da Índia" },
  ],
};

export const paymentMethodConstant = ["CARD", "BOLETO", "PIX"] as const;
export const dueDateConstant = [1, 5, 10, 15, 20, 25] as const;

export const MOCK_USER: UserProfile = {
  name: "Ricardo Oliveira",
  email: "ricardo.oliveira@email.com",
  phone: "(11) 98765-4321",
  address: "Rua das Flores, 123 - São Paulo, SP",
  cpf: "123.456.789-00",
  cardLastDigits: "4589",
  cardBrand: "Visa",
};

export const MOCK_PETS: Pet[] = [
  {
    id: "1",
    name: "Bidu",
    species: PetSpecies.DOG,
    breed: "Beagle",
    age: 4,
    weight: 12.5,
    photo: "https://picsum.photos/seed/bidu/400/400",
    planId: "plan-1",
    bio: "Sou um beagle aventureiro que adora farejar novidades!",
  },
  {
    id: "2",
    name: "Luna",
    species: PetSpecies.CAT,
    breed: "Siamês",
    age: 2,
    weight: 4.2,
    photo: "https://picsum.photos/seed/luna/400/400",
    planId: "plan-2",
    bio: "Dorminhoca profissional e caçadora de laser nas horas vagas.",
  },
];

export const MOCK_CONTRACTS: Contract[] = [
  {
    id: "plan-1",
    petId: "1",
    planName: "Pet Conforto Gold",
    status: "Ativo",
    startDate: "2023-01-15",
    renewalDate: "2024-01-15",
    monthlyValue: 129.9,
    paymentMethod: "Cartão",
  },
  {
    id: "plan-2",
    petId: "2",
    planName: "Pet Essential",
    status: "Ativo",
    startDate: "2023-06-20",
    renewalDate: "2024-06-20",
    monthlyValue: 89.9,
    paymentMethod: "PIX",
  },
];

export const MOCK_INVOICES: Invoice[] = [
  {
    id: "inv-1",
    petId: "1",
    month: "Dezembro 2023",
    dueDate: "2023-12-10",
    value: 129.9,
    status: "Pago",
    paymentMethod: "Cartão",
    link: "#",
  },
  {
    id: "inv-2",
    petId: "2",
    month: "Dezembro 2023",
    dueDate: "2023-12-20",
    value: 89.9,
    status: "Pago",
    paymentMethod: "PIX",
    link: "#",
  },
  {
    id: "inv-3",
    petId: "1",
    month: "Janeiro 2024",
    dueDate: "2024-01-10",
    value: 129.9,
    status: "Pendente",
    paymentMethod: "Cartão",
    link: "#",
  },
  {
    id: "inv-4",
    petId: "2",
    month: "Janeiro 2024",
    dueDate: "2024-01-20",
    value: 89.9,
    status: "Pendente",
    paymentMethod: "PIX",
    pixKey:
      "00020126360014BR.GOV.BCB.PIX011412345678901234520400005303986540510.005802BR5913PETLIFE LTDA6009SAO PAULO62070503***6304E22D",
    link: "#",
  },
];
