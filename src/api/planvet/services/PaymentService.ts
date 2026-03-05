import { PlanvetApi } from "@/api/planvet";
import { ChargeResponseDTO } from "@/api/planvet/dto/response/ChargeResponseDTO";
import { InvoiceResponseDTO } from "@/api/planvet/dto/response/InvoiceResponseDTO";
import { PaymentMethodType } from "@/types";

class UserPaymentService extends PlanvetApi {
  static async createCharge(invoiceId: number, data: { paymentMethod: PaymentMethodType }) {
    const response = await PlanvetApi.client.post<InvoiceResponseDTO>(
      PlanvetApi.router.payments.invoice.id(invoiceId).charge.create,
      data
    );
    return response.data;
  }

  static async getCharge(invoiceId: number) {
    const response = await PlanvetApi.client.get<ChargeResponseDTO>(
      PlanvetApi.router.payments.invoice.id(invoiceId).charge.get
    );
    return response.data;
  }
}

export class PaymentService {
  static user = UserPaymentService;
}
