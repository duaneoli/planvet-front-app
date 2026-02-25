import { PaymentService } from "@/api/planvet/services/PaymentService";
import { PaymentMethodType } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

class UseByUser {
  static createCharge() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({
        invoiceId,
        paymentMethod,
      }: {
        invoiceId: number;
        paymentMethod: PaymentMethodType;
      }) => PaymentService.user.createCharge(invoiceId, paymentMethod),
      onSuccess: (data, variables) => {
        queryClient.setQueryData(["invoice", variables.invoiceId], data);
      },
      onError: (error) => {
        toast.error("Error ao processar pagamento");
      },
    });
  }

  static getCharge(invoiceId: number) {
    return useQuery({
      queryKey: ["charge", invoiceId],
      queryFn: () => PaymentService.user.getCharge(invoiceId),
      staleTime: Infinity,
      enabled: !!invoiceId,
    });
  }
}

export class UseInvoiceService {
  static user = UseByUser;
}

export class UsePaymentService {
  static user = UseByUser;
}
