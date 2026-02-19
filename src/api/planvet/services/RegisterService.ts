import { PlanvetApi } from "@/api/planvet";
import { DueDateType, PaymentMethodType } from "@/types";

export class RegisterService extends PlanvetApi {
  static async created(data: {
    email?: string;
    cpf?: string;
    fullName?: string;
    password?: string;
    confirmPassword?: string;
    petName?: string;
    petBirthDate?: string;
    petSpecies?: number;
    petBreed?: number;
    paymentMethod?: PaymentMethodType;
    dueDate?: DueDateType | undefined | null | number;
    planId?: number;
  }): Promise<{
    id: number;
    email?: string;
    cpf?: string;
    fullName?: string;
    password?: string;
    confirmPassword?: string;
    petName?: string;
    petBirthDate?: string;
    petSpecies?: number;
    petBreed?: number;
    paymentMethod?: PaymentMethodType;
    dueDate?: DueDateType | undefined | null;
  }> {
    return PlanvetApi.client.post(PlanvetApi.router.register.sign_up, data);
  }
}
