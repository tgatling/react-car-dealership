import React from 'react';

import styles from './PaymentSummary.module.css';

interface summaryProps {
  onToggle?: () => void;
  downPayment: number;
  equalPayments: boolean;
  numberOfPayments: number;
  paymentCalculations: { payment: number; amount: number; status: string }[];
  header: boolean;
}

const PaymentSummary = ({
  onToggle,
  downPayment,
  equalPayments,
  numberOfPayments,
  paymentCalculations,
  header,
}: summaryProps) => {
  return (
    <div className={styles.summaryContainer}>
      {header && <h3>Payment Summary</h3>}
      <p>{`Down Payment: $${downPayment}`}</p>
      {equalPayments && (
        <div>
          <p>{`${numberOfPayments} payments of $${paymentCalculations[0].amount.toFixed(
            2
          )}`}</p>
        </div>
      )}
      {!equalPayments && (
        <div>
          <p>{`1 payment of $${paymentCalculations[0].amount.toFixed(2)}`}</p>
          <p>{`${
            numberOfPayments - 1
          } payments of $${paymentCalculations[1].amount.toFixed(2)}`}</p>
        </div>
      )}
      <div className={styles.rightEnd}>
        <div className={styles.buttonContainer}>
          <button>Make a Payment</button>
          {onToggle && <button onClick={onToggle}>View Monthly Bills</button>}
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
