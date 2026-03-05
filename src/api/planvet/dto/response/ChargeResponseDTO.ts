export type ChargeResponseDTO = {
  pix?: {
    encodedImage: string;
    payload: string;
    expirationDate: string;
    description: string;
  };
  bankSlip?: {
    identificationField: string;
    nossoNumero: string;
    barCode: string;
    bankSlipUrl: string;
    daysAfterDueDateToRegistrationCancellation: 1;
  };
  creditCard?: {
    creditCardNumber: string;
    creditCardBrand: string;
  };
};
