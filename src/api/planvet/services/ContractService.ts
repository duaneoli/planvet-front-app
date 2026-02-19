import { PlanvetApi } from "@/api/planvet";
import { DueDateType, PaymentMethodType } from "@/types";

export class ContractService extends PlanvetApi {
  static async getAll(): Promise<Array<{ id: number; name: string }>> {
    return await new Promise((resolve) =>
      setTimeout(() => {
        resolve([
          { id: 1, name: "Plano Básico" },
          { id: 2, name: "Plano Intermediário" },
          { id: 3, name: "Plano Premium" },
        ]);
      }, 1000)
    );
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
    id: number;
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
  }> {
    return PlanvetApi.client.post(PlanvetApi.router.register.sign_up, data);
  }
}
