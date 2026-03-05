import { Query } from "@/lib/Query";

export type UserInvoiceGetAllRequest = Query<
  "originalDate",
  { status?: Array<"OPEN" | "PAID" | "CANCELLED"> }
>;
