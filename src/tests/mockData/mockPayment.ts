import { Payments } from '../../models/payments';

export const MOCK_PAYMENTS: Payments = {
  paymentId: 'testPaymentId',
  userId: '',
  carId: '',
  carTotal: 0,
  totalPaid: 0,
  numberOfPayments: 0,
  paymentTable: [
    {
      //deposit
      paymentId: '',
      paymentDueDate: new Date(),
      amountDue: 0,
      transactions: [
          {
              transactionId: '',
              confirmationNumber: 0,
              paymentDate: new Date(),
              paymentAmount: 0,
              transactionSplit: false
          }
      ],
    },
    {
      paymentId: '',
      paymentDueDate: new Date(),
      amountDue: 0,
      transactions: [],
    },
  ],
};
