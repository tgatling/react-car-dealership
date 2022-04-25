import { Payments } from '../../models/payments';

export const MOCK_PAYMENTS: Payments = {
  // paymentId = offerId
  paymentId: '-N0XivMV90xhoOmyfmzi',
  userId: 'bWgrdZYBRtaoMLBAVAh8piA9jbi1',
  carId: '-MyKkyjzrE_3aJqvZmTK',
  carTotal: 12500,
  totalPaid: 6041.12,
  numberOfPayments: 17,
  paymentTable: [
    {
      // down payment
      paymentId: '-N0XivMV90xhoOmyfm_0',
      paymentDueDate: '2022-04-01T00:00:00.000Z',
      amountDue: 5000,
      completed: true,
      transactions: [
        {
          transactionId: '-N0XivMV90xhoOmyfm_0_0',
          confirmationNumber: 1493372275626410000,
          paymentDate: '2022-04-01T00:00:00.000Z',
          paymentAmount: 5000,
          transactionSplit: false,
        },
      ],
    },
    {
      // first payment period
      paymentId: '-N0XivMV90xhoOmyfm_1',
      paymentDueDate: '2022-05-01T00:00:00.000Z',
      amountDue: 441.12,
      completed: true,
      transactions: [
        {
          transactionId: '-N0XivMV90xhoOmyfm_1_0',
          confirmationNumber: 47286263816913720000,
          paymentDate: '2022-04-15T00:00:00.000Z',
          paymentAmount: 220.56,
          transactionSplit: false,
        },
        {
          transactionId: '-N0XivMV90xhoOmyfm_1_1',
          confirmationNumber: 0,
          paymentDate: '2022-04-18T00:00:00.000Z',
          paymentAmount: 220.56,
          transactionSplit: false,
        },
      ],
    },
    {
      // second payment period
      paymentId: '-N0XivMV90xhoOmyfm_2',
      paymentDueDate: '2022-06-01T00:00:00.000Z',
      amountDue: 441.18,
      completed: true,
      transactions: [
        {
          transactionId: '-N0XivMV90xhoOmyfm_2_0',
          confirmationNumber: 66202307581315090000,
          paymentDate: '2022-04-19T00:00:00.000Z',
          paymentAmount: 200,
          transactionSplit: false,
        },
        {
          transactionId: '-N0XivMV90xhoOmyfm_2_1',
          confirmationNumber: 16879560207907730000,
          paymentDate: '2022-04-23T00:00:00.000Z',
          paymentAmount: 241.18,
          transactionSplit: true,
        },
      ],
    },
    {
      // third payment period
      paymentId: '-N0XivMV90xhoOmyfm_3',
      paymentDueDate: '2022-07-01T00:00:00.000Z',
      amountDue: 441.18,
      completed: false,
      transactions: [
        {
          transactionId: '-N0XivMV90xhoOmyfm_3_0',
          confirmationNumber: 16879560207907730000,
          paymentDate: '2022-04-26T00:00:00.000Z',
          paymentAmount: 158.82,
          transactionSplit: false,
        }
      ],
    },
  ],
};
