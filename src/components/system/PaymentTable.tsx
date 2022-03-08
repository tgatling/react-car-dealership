import React from 'react';

import { Payments } from '../../models/payments';
import PaymentItem from './PaymentItem';
import { calculateRemainingPayments } from './Calculations';
import styles from './PaymentTable.module.css';

// TODO: REMOVE HARDCODED PAYMENT INFORMATION
const DUMMY_PAYMENTS: Payments = {
  carId: '-MwlR-FOe4z_HTtcCI2e',
  totalAmount: 11300,
  downPayment: 3300,
  numberOfPayments: 15,
  paymentsMade: 3,
};

const PaymentTable = () => {
  let { paymentCalculations } = calculateRemainingPayments(DUMMY_PAYMENTS);

  return (
    <div className={styles.card}>
      {/* <h2>{`Total Remaining: $${'[amount]'}`}</h2> */}
      {paymentCalculations.map((payment) => {
        return (
          <PaymentItem
            key={`payment-${payment.payment}`}
            payment={payment.payment}
            amount={payment.amount}
            status={payment.status}
          />
        );
      })}
    </div>
  );
};

export default PaymentTable;
