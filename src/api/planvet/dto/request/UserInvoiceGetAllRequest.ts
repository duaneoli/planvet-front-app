import { Query } from "@/lib/Query";

export type UserInvoiceGetAllRequest = Query<
  "originalDate",
  { status?: Array<"ab" | "pg" | "ca"> }
>;
