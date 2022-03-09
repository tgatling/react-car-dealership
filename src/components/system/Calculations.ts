import { Offer } from '../../models/offer';
import { Payments } from '../../models/payments';

// OFFERS
export const acceptOffer = (offer: Offer) => {};

export const rejectAllOtherOffers = (carId: string, offerId: string) => {};

// PAYMENTS

const calculateIndividualPayments = (
  totalPrice: number,
  downPayment: number,
  numOfPayments: number
) => {
  let numberOfEqualPayments: number;
  let unequalPaymentAmount: number;

  let totalAfterDownPayment: number = totalPrice - downPayment;

  let paymentAmount = +(
    Math.round((totalAfterDownPayment / numOfPayments) * 100) / 100
  ).toFixed(2);
  let calculatedTotal = paymentAmount * numOfPayments;

  if (calculatedTotal === totalAfterDownPayment) {
    numberOfEqualPayments = numOfPayments;
    unequalPaymentAmount = 0;
  } else if (calculatedTotal > totalAfterDownPayment) {
    let difference = calculatedTotal - totalAfterDownPayment;
    unequalPaymentAmount = +(
      Math.round((paymentAmount - difference) * 100) / 100
    ).toFixed(2);
    numberOfEqualPayments = numOfPayments - 1;
  } else {
    let difference = totalAfterDownPayment - calculatedTotal;
    unequalPaymentAmount = +(
      Math.round((paymentAmount + difference) * 100) / 100
    ).toFixed(2);
    numberOfEqualPayments = numOfPayments - 1;
  }

  return {
    numberOfEqualPayments,
    unequalPaymentAmount,
    paymentAmount,
  };
};

export const calculatePaymentsFromOffer = (totalAmount: number, downPayment: number, numberOfPayments: number) => {
  let paymentCalculations = [];

  let { numberOfEqualPayments, unequalPaymentAmount, paymentAmount } =
    calculateIndividualPayments(
      totalAmount,
      downPayment,
      numberOfPayments
    );

  let startingPoint = 0;
  let stoppingPoint = numberOfEqualPayments;

  if (unequalPaymentAmount !== 0) {
    paymentCalculations.push({ payment: 1, amount: unequalPaymentAmount, status: '' });
    startingPoint = 1;
    stoppingPoint++;
  }

  for (let i = startingPoint; i < stoppingPoint; i++) {
    paymentCalculations.push({ payment: i + 1, amount: paymentAmount, status: '' });
  }

  return {
    paymentCalculations,
  };
};

export const calculateRemainingPayments = (payments: Payments) => {
  let paymentCalculations = [];

  let { numberOfEqualPayments, unequalPaymentAmount, paymentAmount } =
    calculateIndividualPayments(
      payments.totalAmount,
      payments.downPayment,
      payments.numberOfPayments
    );

  let startingPoint = 0;
  let stoppingPoint = numberOfEqualPayments;

  // handling unequal payment status
  if (unequalPaymentAmount !== 0) {
    if (payments.paymentsMade === 0) {
      paymentCalculations.push({
        payment: 1,
        amount: unequalPaymentAmount,
        status: 'UNPAID',
      });
    } else {
      paymentCalculations.push({
        payment: 1,
        amount: unequalPaymentAmount,
        status: 'PAID',
      });
    }
    startingPoint = 1;
    stoppingPoint++;
  }

  // handling equal payment statuses
  for (let i = startingPoint; i < stoppingPoint; i++) {
    if (i < payments.paymentsMade) {
      paymentCalculations.push({
        payment: i + 1,
        amount: paymentAmount,
        status: 'PAID',
      });
    } else {
      paymentCalculations.push({
        payment: i + 1,
        amount: paymentAmount,
        status: 'UNPAID',
      });
    }
  }

  return {
    paymentCalculations,
  };
};
