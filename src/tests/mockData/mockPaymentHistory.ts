import { Bill, Payment } from '../../models/payments';
import { ACCEPTED_STATUS, Offer } from '../../models/offer';

// MOCK OFFER
export const mockOffer: Offer = {
  offerId: '-N0XivMV90xhoOmyfmzi',
  offerDate: '2022-04-25T21:58:28.020Z',
  status: ACCEPTED_STATUS,
  carId: '-MyKkyjzrE_3aJqvZmTK',
  userId: 'bWgrdZYBRtaoMLBAVAh8piA9jbi1',
  empUserId: '0bVRB4BBHNRMGVH929mvyTNqFlc2',
  carTotal: 12500,
  downPayment: 5000,
  totalPaid: 6041.12,
  numberOfPayments: 17,
};

// MOCK BILL
export const downPayment: Bill = {
  billId: '-N0XivMV90xhoOmyfmzi_0',
  offerId: '-N0XivMV90xhoOmyfmzi',
  billNumber: 0,
  paymentDueDate: '2022-04-01T00:00:00.000Z',
  amountDue: 5000,
  paymentCompleted: true,
};

export const firstBill: Bill = {
  billId: '-N0XivMV90xhoOmyfmzi_1',
  offerId: '-N0XivMV90xhoOmyfmzi',
  billNumber: 1,
  paymentDueDate: '2022-05-01T00:00:00.000Z',
  amountDue: 441.12,
  paymentCompleted: true,
};

export const secondBill: Bill = {
  billId: '-N0XivMV90xhoOmyfmzi_2',
  offerId: '-N0XivMV90xhoOmyfmzi',
  billNumber: 2,
  paymentDueDate: '2022-06-01T00:00:00.000Z',
  amountDue: 441.18,
  paymentCompleted: true,
};

export const thirdBill: Bill = {
  billId: '-N0XivMV90xhoOmyfmzi_3',
  offerId: '-N0XivMV90xhoOmyfmzi',
  billNumber: 3,
  paymentDueDate: '2022-07-01T00:00:00.000Z',
  amountDue: 441.18,
  paymentCompleted: false,
};

// MOCK PAYMENTS
// Down Payment - Bill 0
export const paymentOne: Payment = {
  paymentId: '-N0XivMV90xhoOmyfm_0_0',
  billId: '',
  offerId: '-N0XivMV90xhoOmyfmzi',
  carId: '-MyKkyjzrE_3aJqvZmTK',
  userId: 'bWgrdZYBRtaoMLBAVAh8piA9jbi1',
  paymentNumber: 1,
  confirmationNumber: 1493372275626410000,
  paymentDate: '2022-04-01T00:00:00.000Z',
  paymentAmount: 5000,
  prepaymentOfNextBill: false,
};

// Bill 1
export const paymentTwo: Payment = {
  paymentId: '-N0XivMV90xhoOmyfm_1_0',
  billId: '',
  offerId: '-N0XivMV90xhoOmyfmzi',
  carId: '-MyKkyjzrE_3aJqvZmTK',
  userId: 'bWgrdZYBRtaoMLBAVAh8piA9jbi1',
  paymentNumber: 2,
  confirmationNumber: 47286263816913720000,
  paymentDate: '2022-04-15T00:00:00.000Z',
  paymentAmount: 220.56,
  prepaymentOfNextBill: false,
};

export const paymentThree: Payment = {
  paymentId: '-N0XivMV90xhoOmyfm_1_1',
  billId: '',
  offerId: '-N0XivMV90xhoOmyfmzi',
  carId: '-MyKkyjzrE_3aJqvZmTK',
  userId: 'bWgrdZYBRtaoMLBAVAh8piA9jbi1',
  paymentNumber: 3,
  confirmationNumber: 0,
  paymentDate: '2022-04-18T00:00:00.000Z',
  paymentAmount: 220.56,
  prepaymentOfNextBill: false,
};

// Bill 2
export const paymentFour: Payment = {
  paymentId: '-N0XivMV90xhoOmyfm_2_0',
  billId: '',
  offerId: '-N0XivMV90xhoOmyfmzi',
  carId: '-MyKkyjzrE_3aJqvZmTK',
  userId: 'bWgrdZYBRtaoMLBAVAh8piA9jbi1',
  paymentNumber: 4,
  confirmationNumber: 66202307581315090000,
  paymentDate: '2022-04-19T00:00:00.000Z',
  paymentAmount: 200,
  prepaymentOfNextBill: false,
};
export const paymentFive: Payment = {
  paymentId: '-N0XivMV90xhoOmyfm_2_1',
  billId: '',
  offerId: '-N0XivMV90xhoOmyfmzi',
  carId: '-MyKkyjzrE_3aJqvZmTK',
  userId: 'bWgrdZYBRtaoMLBAVAh8piA9jbi1',
  paymentNumber: 5,
  confirmationNumber: 16879560207907730000,
  paymentDate: '2022-04-23T00:00:00.000Z',
  paymentAmount: 241.18,
  prepaymentOfNextBill: true,
};

// Bill 3
export const paymentSix: Payment = {
  paymentId: '-N0XivMV90xhoOmyfm_3_0',
  billId: '',
  offerId: '-N0XivMV90xhoOmyfmzi',
  carId: '-MyKkyjzrE_3aJqvZmTK',
  userId: 'bWgrdZYBRtaoMLBAVAh8piA9jbi1',
  paymentNumber: 6,
  confirmationNumber: 16879560207907730000,
  paymentDate: '2022-04-26T00:00:00.000Z',
  paymentAmount: 158.82,
  prepaymentOfNextBill: false,
};
