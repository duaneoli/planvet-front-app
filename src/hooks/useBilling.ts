import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export const BILLING_KEYS = {
  invoices: ["invoices"] as const,
};

export const useInvoices = () => {
  return useQuery({
    queryKey: BILLING_KEYS.invoices,
    queryFn: api.billing.getInvoices,
  });
};
