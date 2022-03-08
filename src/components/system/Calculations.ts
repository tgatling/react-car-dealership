import { Offer } from '../../models/offer';
import { Payments } from '../../models/payments';

// OFFERS
export const acceptOffer = (offer: Offer) => {};

export const rejectAllOtherOffers = (carId: string, offerId: string) => {};

// PAYMENTS

export const calculatePaymentsFromOffer = (offer: Offer) => {
  let paymentCalculations = [];
  let numberOfEqualPayments: number;
  let unequalPaymentAmount: number;

  let totalAfterDownPayment: number = offer.carTotal - offer.downPayment;

  let paymentAmount = +(
    Math.round((totalAfterDownPayment / offer.numberOfPayments) * 100) / 100
  ).toFixed(2);
  let calculatedTotal = paymentAmount * offer.numberOfPayments;

  if (calculatedTotal === totalAfterDownPayment) {
    numberOfEqualPayments = offer.numberOfPayments;
    unequalPaymentAmount = 0;
  } else if (calculatedTotal > totalAfterDownPayment) {
    let difference = calculatedTotal - totalAfterDownPayment;
    unequalPaymentAmount = +(
      Math.round((paymentAmount - difference) * 100) / 100
    ).toFixed(2);
    numberOfEqualPayments = offer.numberOfPayments - 1;
  } else {
    let difference = totalAfterDownPayment - calculatedTotal;
    unequalPaymentAmount = +(
      Math.round((paymentAmount + difference) * 100) / 100
    ).toFixed(2);
    numberOfEqualPayments = offer.numberOfPayments - 1;
  }

  let startingPoint = 0;
  let stoppingPoint = numberOfEqualPayments;

  if (unequalPaymentAmount !== 0) {
    paymentCalculations.push({ payment: 1, amount: unequalPaymentAmount });
    startingPoint = 1;
    stoppingPoint++;
  }

  for (let i = startingPoint; i < stoppingPoint; i++) {
    paymentCalculations.push({ payment: i + 1, amount: paymentAmount });
  }

  return {
    paymentCalculations,
  };
};

export const calculateRemainingPayments = (payments: Payments) => {
  let paymentCalculations = [];
  let numberOfEqualPayments: number;
  let unequalPaymentAmount: number;

  let totalAfterDownPayment: number =
    payments.totalAmount - payments.downPayment;

  let paymentAmount = +(
    Math.round((totalAfterDownPayment / payments.numberOfPayments) * 100) / 100
  ).toFixed(2);
  let calculatedTotal = paymentAmount * payments.numberOfPayments;

  if (calculatedTotal === totalAfterDownPayment) {
    numberOfEqualPayments = payments.numberOfPayments;
    unequalPaymentAmount = 0;
  } else if (calculatedTotal > totalAfterDownPayment) {
    let difference = calculatedTotal - totalAfterDownPayment;
    unequalPaymentAmount = +(
      Math.round((paymentAmount - difference) * 100) / 100
    ).toFixed(2);
    numberOfEqualPayments = payments.numberOfPayments - 1;
  } else {
    let difference = totalAfterDownPayment - calculatedTotal;
    unequalPaymentAmount = +(
      Math.round((paymentAmount + difference) * 100) / 100
    ).toFixed(2);
    numberOfEqualPayments = payments.numberOfPayments - 1;
  }

  let startingPoint = 0;
  let stoppingPoint = numberOfEqualPayments;

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

  // TODO: FIX PAYMENT STATUS

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
