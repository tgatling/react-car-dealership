import { PaymentHistory, Bill } from '../../models/payments';
import { paymentOne } from './mockPayments';

export const downPayment: Bill = {
  billId: '',
  paymentHistoryId: '-N0XivMV90xhoOmyfmzi',
  billNumber: 0,
  paymentDueDate: '2022-04-01T00:00:00.000Z',
  amountDue: 5000,
  paymentCompleted: true,
  // payments: [paymentOne]
};

export const firstPayment: Bill = {
  billId: '',
  paymentHistoryId: '-N0XivMV90xhoOmyfmzi',
  billNumber: 1,
  paymentDueDate: '2022-05-01T00:00:00.000Z',
  amountDue: 441.12,
  paymentCompleted: true,
  // payments: [paymentTwo, paymentThree]
};

export const secondPayment: Bill = {
  billId: '',
  paymentHistoryId: '-N0XivMV90xhoOmyfmzi',
  billNumber: 2,
  paymentDueDate: '2022-06-01T00:00:00.000Z',
  amountDue: 441.18,
  paymentCompleted: true,
  // payments: [paymentFour, paymentFive]
};

export const thirdPayment: Bill = {
  billId: '',
  paymentHistoryId: '-N0XivMV90xhoOmyfmzi',
  billNumber: 3,
  paymentDueDate: '2022-07-01T00:00:00.000Z',
  amountDue: 441.18,
  paymentCompleted: false,
  // payments: [paymentSix]
};

export const mockPaymentHistory: PaymentHistory = {
  // paymentHistoryId = offerId
  paymentHistoryId: '-N0XivMV90xhoOmyfmzi',
  userId: 'bWgrdZYBRtaoMLBAVAh8piA9jbi1',
  carId: '-MyKkyjzrE_3aJqvZmTK',
  totalCarPrice: 12500,
  totalPaid: 6041.12,
  downPayment: 5000,
  numberOfMonthlyPayments: 17,
  // bills: [
  //   downPayment,
  //   firstPayment,
  //   secondPayment,
  //   thirdPayment,
  // ],
};
