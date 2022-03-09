import React, { useState } from 'react';

import PaymentItem from './PaymentItem';
import { calculateRemainingPayments } from '../Calculations';
import styles from './PaymentTable.module.css';
import PaymentInfo from './PaymentInfo';
import PaymentSummary from './PaymentSummary';

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

  let equalPayments: boolean;

  if (paymentCalculations.length > 1) {
    equalPayments =
      paymentCalculations[0].amount === paymentCalculations[1].amount
        ? true
        : false;
  } else {
    equalPayments = true;
  }

  const toggleViewTable = () => {
    setViewFullTable(!viewFullTable);
  };

  return (
    <div className={styles.card}>
      <PaymentSummary
        onToggle={toggleViewTable}
        equalPayments={false}
        numberOfPayments={payments.numberOfPayments}
        paymentCalculations={paymentCalculations}
        header={false}
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
