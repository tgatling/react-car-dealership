import React from 'react';

import styles from './PaymentSummary.module.css';

interface summaryProps {
  onToggle: () => void;
  equalPayments: boolean;
  numberOfPayments: number;
  paymentCalculations: { payment: number; amount: number; status: string }[];
  header: boolean;
}

const PaymentSummary = ({
  onToggle,
  equalPayments,
  numberOfPayments,
  paymentCalculations,
  header,
}: summaryProps) => {
  return (
    <div className={styles.summaryContainer}>
      {header && <h3>Payment Summary</h3>}
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
      <div className={styles.buttonContainer}>
        <button onClick={onToggle}>View Full Payment Table</button>
      </div>
    </div>
  );
};

export default PaymentSummary;
