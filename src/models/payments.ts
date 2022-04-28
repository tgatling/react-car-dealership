export class Bill {
  billId: string = '';
  offerId: string = '';
  userId: string = '';
  billNumber: number = 0;
  paymentDueDate: string | Date = new Date().toISOString();
  amountDue: number = 0;
  paymentCompleted: boolean = false;
  paymentIds: { paymentNumber: number; paymentId: string }[] = [];
}

export class Payment {
  paymentId: string = '';
  billId: string = '';
  offerId: string = '';
  carId: string = '';
  userId: string = '';
  paymentNumber: number = 1;
  confirmationNumber: number = 0;
  paymentDate: string | Date = new Date().toISOString();
  paymentAmount: number = 0;
  prepaymentOfNextBill: boolean = false;
}
