import React from 'react';

import checkMark from '../../images/payments/check-mark.png';
import checkbox from '../../images/payments/checkbox.png';
import styles from './BillDisplay.module.css';

import { Bill } from '../../models/payments';

interface billProp {
  bill: Bill;
}

const BillItem = ({ bill }: billProp) => {
  const { billId, billNumber, paymentDueDate, amountDue, paymentCompleted } =
    bill;

  return (
    <div className={styles.billContainer}>
      <div className={styles.billElement}>
          <div className={styles.billIcon}>
            <div
              className={
                bill.paymentCompleted ? styles.checkmark : styles.checkbox
              }
            >
              <img
                src={bill.paymentCompleted ? checkMark : checkbox}
                alt='bill'
              />
            </div>
          </div>
        <div className={styles.billHeader}>
          <h2>Bill Title</h2>
        </div>
      </div>
      <div className={styles.billElement}>
        <div className={styles.billStatus}>
          {paymentCompleted && <p>PAID</p>}
          {!paymentCompleted && <button>PAY NOW</button>}
        </div>
        <div className={styles.billDetails}>
          <div className={styles.billRow}>
            <div className={styles.billRowElements}>
              <div className={styles.row}>
                <label>{'Bill Id: '}</label>
                <p>{bill.billId}</p>
              </div>
            </div>
            <div className={styles.billRowElements}>
              <p>Text</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillItem;
