import { Bill } from '../../models/payments';

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

export const calculatePaymentsFromOffer = (
  totalAmount: number,
  downPayment: number,
  numberOfPayments: number
) => {
  let paymentCalculations = [];

  let { numberOfEqualPayments, unequalPaymentAmount, paymentAmount } =
    calculateIndividualPayments(totalAmount, downPayment, numberOfPayments);

  let startingPoint = 0;
  let stoppingPoint = numberOfEqualPayments;

  if (unequalPaymentAmount !== 0) {
    paymentCalculations.push({
      payment: 1,
      amount: unequalPaymentAmount,
      status: '',
    });
    startingPoint = 1;
    stoppingPoint++;
  }

  for (let i = startingPoint; i < stoppingPoint; i++) {
    paymentCalculations.push({
      payment: i + 1,
      amount: paymentAmount,
      status: '',
    });
  }

  return {
    paymentCalculations,
  };
};

export const calculateRemainingPayment = (
  bill: Bill,
  paymentAmount: number
) => {};
