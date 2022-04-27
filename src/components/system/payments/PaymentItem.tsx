import React from 'react';

import styles from './PaymentItem.module.css';

interface paymentProps {
  payment: number;
  amount: number;
  status: string;
}

const PaymentItem = ({ payment, amount, status }: paymentProps) => {
  return (
    <div className={styles.card}>
      {payment === 0 && <div>{`Down Payment: `}</div>}
      {payment > 0 && <div>{`Payment ${payment}`}</div>}
      <div>${amount.toFixed(2)}</div>
      {status && <div className={styles.status}>{status}</div>}
    </div>
  );
};

export default PaymentItem;
