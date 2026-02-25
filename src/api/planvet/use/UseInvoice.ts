import { UserInvoiceGetAllRequest } from "@/api/planvet/dto/request/UserInvoiceGetAllRequest";
import { InvoiceService } from "@/api/planvet/services/InvoiceService";
import { useQuery } from "@tanstack/react-query";

class UseByUser {
  static getAll(query: UserInvoiceGetAllRequest) {
    return useQuery({
      queryKey: ["invoices", query.toString()],
      queryFn: () => InvoiceService.user.getAll(query),
      staleTime: 1000 * 60 * 5,
      placeholderData: (previus) => previus,
    });
  }
}

export class UseInvoiceService {
  static user = UseByUser;
}
