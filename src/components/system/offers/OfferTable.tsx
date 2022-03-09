import React from 'react';

import PaymentItem from '../payments/PaymentItem';
import { calculatePaymentsFromOffer } from '../Calculations';
import styles from '../payments/PaymentTable.module.css';

interface paymentTableProps {
  totalAmount: number;
  downPayment: number;
  numberOfPayments: number;
}

const OfferTable = ({
  totalAmount,
  downPayment,
  numberOfPayments,
}: paymentTableProps) => {
  let { paymentCalculations } = calculatePaymentsFromOffer(
    totalAmount,
    downPayment,
    numberOfPayments
  );

  return (
    <div className={styles.card}>
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

export default OfferTable;
