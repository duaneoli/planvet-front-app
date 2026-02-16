import { DueDateType, PaymentMethodType } from "@/types";

export class ContractService {
    static async getAll(): Promise<Array<{ id: number, name: string }>> {
        return await new Promise(resolve => setTimeout(() => {
            resolve([
                { id: 1, name: "Plano Básico" },
                { id: 2, name: "Plano Intermediário" },
                { id: 3, name: "Plano Premium" },
            ])
        }, 1000))
    }

    static async created(data: {
        email?: string;
        cpf?: string;
        fullName?: string;
        password?: string;
        confirmPassword?: string;
        petName?: string;
        petBirthDate?: string;
        petSpecies?: any;
        petBreed?: string;
        paymentMethod?: PaymentMethodType;
        dueDate?: DueDateType | undefined | null;
    }): Promise<{
        id: number, email?: string;
        cpf?: string;
        fullName?: string;
        password?: string;
        confirmPassword?: string;
        petName?: string;
        petBirthDate?: string;
        petSpecies?: any;
        petBreed?: string;
        paymentMethod?: PaymentMethodType;
        dueDate?: DueDateType | undefined | null;
    }> {
        return await new Promise((resolve, reject) => setTimeout(() => {
            // reject()
            resolve({ id: 1, ...data })
        }, 1000))
    }
}