import { Payment } from '../../models/payments';

// Down Payment - Bill 0
export const paymentOne: Payment = {
  paymentId: '-N0XivMV90xhoOmyfm_0_0',
  billId: '',
  carId: '-MyKkyjzrE_3aJqvZmTK',
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
  carId: '-MyKkyjzrE_3aJqvZmTK',
  paymentNumber: 2,
  confirmationNumber: 47286263816913720000,
  paymentDate: '2022-04-15T00:00:00.000Z',
  paymentAmount: 220.56,
  prepaymentOfNextBill: false,
};

export const paymentThree: Payment = {
  paymentId: '-N0XivMV90xhoOmyfm_1_1',
  billId: '',
  carId: '-MyKkyjzrE_3aJqvZmTK',
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
  carId: '-MyKkyjzrE_3aJqvZmTK',
  paymentNumber: 4,
  confirmationNumber: 66202307581315090000,
  paymentDate: '2022-04-19T00:00:00.000Z',
  paymentAmount: 200,
  prepaymentOfNextBill: false,
};
export const paymentFive: Payment = {
  paymentId: '-N0XivMV90xhoOmyfm_2_1',
  billId: '',
  carId: '-MyKkyjzrE_3aJqvZmTK',
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
  carId: '-MyKkyjzrE_3aJqvZmTK',
  paymentNumber: 6,
  confirmationNumber: 16879560207907730000,
  paymentDate: '2022-04-26T00:00:00.000Z',
  paymentAmount: 158.82,
  prepaymentOfNextBill: false,
};
