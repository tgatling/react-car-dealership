import React, { useState } from 'react';

import PaymentItem from './PaymentItem';
import { calculateRemainingPayments } from '../Calculations';
import styles from './PaymentTable.module.css';
import PaymentInfo from './PaymentInfo';

interface paymentTableProps {
  carId: string;
  totalAmount: number;
  downPayment: number;
  numberOfPayments: number;
  paymentsMade: number;
}

const PaymentTable = (payments: paymentTableProps) => {
  const [viewFullTable, setViewFullTable] = useState(false);
  let { paymentCalculations } = calculateRemainingPayments(payments);

  return (
    <div className={styles.card}>
      <PaymentInfo
        totalAmount={payments.totalAmount}
        downPayment={payments.downPayment}
        numberOfPayments={payments.numberOfPayments}
      />
      {viewFullTable && <div>
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
      </div>}
    </div>
  );
};

export default PaymentTable;
