import React from 'react';

import styles from './PaymentItem.module.css';

interface paymentProps {
    payment: number,
    amount: number,
    status: string,
}

const PaymentItem = ({payment, amount, status}: paymentProps) => {
    return (
        <div className={styles.card}>
            <div>{`Payment Number: ${payment}`}</div>
            <div>${amount.toFixed(2)}</div>
            {status && <div>{status}</div>}
        </div>
    );
};

export default PaymentItem;