import { InvoiceResponseDTO } from "@/api/planvet/dto/response/InvoiceResponseDTO";
import { UseInvoiceService } from "@/hooks/planvet/UseInvoice";
import { PaymentByBoleto } from "@/components/Payments/PaymentByBoleto";
import { PaymentByCard } from "@/components/Payments/PaymentByCard";
import { PaymentByPix } from "@/components/Payments/PaymentByPix";
import { Query } from "@/lib/Query";
import { PaymentMethodType } from "@/types";
import React, { useEffect, useState } from "react";


export function StepSeven(props: {
  onPrevious: () => void;
  onNext: () => void;
  paymentMethod: PaymentMethodType | undefined;
}) {
  const [invoice, setInvoice] = useState<InvoiceResponseDTO | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType | undefined>(
    props.paymentMethod
  );

  const { data } = UseInvoiceService.user.getAll(
    Query.paramsToQuery({
      filters: { status: ["OPEN"] },
      sortBy: { originalDate: "ASC" },
      pageSize: 1,
    })
  );

  useEffect(() => {
    if (!data) return;
    setInvoice(data.data[0]);
  }, [data]);

  return (
    <React.Fragment>
      {invoice && paymentMethod === "CREDIT_CARD" && <PaymentByCard invoice={invoice} />}
      {invoice && paymentMethod === "BOLETO" && (
        <PaymentByBoleto
          invoice={invoice}
          changeToPix={() => setPaymentMethod("PIX")}
          success={() => props.onNext()}
        />
      )}
      {invoice && paymentMethod === "PIX" && (
        <PaymentByPix invoice={invoice} success={() => props.onNext()} />
      )}
    </React.Fragment>
  );
}
