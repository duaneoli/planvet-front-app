import { PlanvetApi } from "@/api/planvet";
import { UserInvoiceGetAllRequest } from "@/api/planvet/dto/request/UserInvoiceGetAllRequest";
import { InvoiceResponseDTO } from "@/api/planvet/dto/response/InvoiceResponseDTO";
import { ResponsePaginationDTO } from "@/api/planvet/dto/response/TypesDTO";

class UserInvoiceService extends PlanvetApi {
  static async getAll(query: UserInvoiceGetAllRequest) {
    const response = await PlanvetApi.client.get<ResponsePaginationDTO<InvoiceResponseDTO>>(
      PlanvetApi.router.users.invoices.list,
      { params: query.toParams() }
    );
    return response.data;
  }
}

export class InvoiceService extends PlanvetApi {
  static user = UserInvoiceService;
}
