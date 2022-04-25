export class Transaction {
  transactionId: string = '';
  confirmationNumber: number = 0;
  paymentDate: string | Date = new Date().toISOString();
  paymentAmount: number = 0;
  transactionSplit: boolean = false;
}

export class Payment {
  paymentId: string = '';
  paymentDueDate: string | Date = new Date().toISOString();
  amountDue: number = 0;
  transactions: Transaction[] = [] 
}

export class Payments {
  paymentId?: string;
  userId: string = '';
  carId: string = '';
  carTotal: number = 0;
  totalPaid: number = 0;
  numberOfPayments: number = 0;
  paymentTable: Payment[] = []

}

// BREAKDOWN

/*
* Transaction
* Transaction Id: offerId_transactionNumber
*/

/*
* Payment Table
* - Index 0: Down Payment
* - Index 1: Payment One
* - Index 2: Payment Two
*/