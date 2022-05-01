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
      <div className={styles.alignment}>
        {payment === 0 && <div>{`Down Payment: `}</div>}
        {payment > 0 && <div>{`Bill Number ${payment}:`}</div>}
      </div>
      <div className={styles.alignment}>
        <div>${amount.toFixed(2)}</div>
      </div>
      <div className={styles.alignment}>
        {status && <div className={styles.status}>{status}</div>}
      </div>
    </div>
  );
};

export default PaymentItem;
