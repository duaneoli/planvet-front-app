import { PlanvetApi } from "@/api/planvet";
import { InvoiceResponseDTO } from "@/api/planvet/dto/response/InvoiceResponseDTO";
import { PaymentMethodType } from "@/types";

class UserPaymentService extends PlanvetApi {
  static async createCharge(invoiceId: number, paymentMethod: PaymentMethodType) {
    const response = await PlanvetApi.client.post<InvoiceResponseDTO>(
      PlanvetApi.router.payments.invoice.id(invoiceId).charge.create,
      { paymentMethod }
    );
    return response;
  }

  static async getCharge(invoiceId: number) {
    const response = await PlanvetApi.client.get<{
      pix: {
        encodedImage: string;
        payload: string;
        expirationDate: string;
      };
      creditCard: null;
      bankSlip: {
        identificationField: string;
        nossoNumero: string;
        barCode: string;
        daysAfterDueDateToRegistrationCancellation: null;
        bankSlipUrl: string;
      };
    }>(PlanvetApi.router.payments.invoice.id(invoiceId).charge.get);
    return response.data;
  }
}

export class PaymentService {
  static user = UserPaymentService;
}
