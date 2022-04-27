export class Payment {
  paymentId: string = '';
  billId: string = '';
  carId: string = '';
  paymentNumber: number = 1;
  confirmationNumber: number = 0;
  paymentDate: string | Date = new Date().toISOString();
  paymentAmount: number = 0;
  prepaymentOfNextBill: boolean = false;
}

export class Bill {
  billId: string = '';
  paymentHistoryId: string = '';
  billNumber: number = 0;
  paymentDueDate: string | Date = new Date().toISOString();
  amountDue: number = 0;
  paymentCompleted: boolean = false;
}

export class PaymentHistory {
  paymentHistoryId: string = '';
  userId: string = '';
  carId: string = '';
  totalCarPrice: number = 0;
  totalPaid: number = 0;
  downPayment: number = 0;
  numberOfMonthlyPayments: number = 0;
}

// BREAKDOWN

// paymentHistoryId: offerId
// paymentId: paymentHistoryId_billId

/*
* Payment Table
* - bill 0: Down Payment
* - bill 1: Payment One
* - bill 2: Payment Two
*/