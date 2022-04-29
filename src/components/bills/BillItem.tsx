import React from 'react';

import styles from './BillDisplay.module.css';

import { Bill } from '../../models/payments';

interface billProp {
  bill: Bill;
}

const BillItem = ({ bill }: billProp) => {
  const { billId, billNumber, paymentDueDate, amountDue, paymentCompleted } =
    bill;

  return (
      <div className={styles.itemContainer}>
        <div className={styles.billElement}>
          <label>{'Bill Id: '}</label>
          <p>{bill.billId}</p>
        </div>
      </div>
  );
};

export default BillItem;
