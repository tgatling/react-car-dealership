import React from 'react';

import PaymentItem from './PaymentItem';
import { calculateRemainingPayments } from '../Calculations';
import styles from './PaymentTable.module.css';
import PaymentInfo from './PaymentInfo';

interface paymentTableProps {
  carId: string;
  totalAmount: number,
  downPayment: number,
  numberOfPayments: number,
  paymentsMade: number,
}

const PaymentTable = (payments: paymentTableProps) => {
  let { paymentCalculations } = calculateRemainingPayments(payments);

  return (
    <div className={styles.card}>
      <PaymentInfo/>
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
