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
      <div className={styles.itemContainer}>
        <div className={styles.billElement}>
            <div>
                {/* <img src={bill.paymentCompleted ? checkMark : checkbox}/> */}
            </div>
          <label>{'Bill Id: '}</label>
          <p>{bill.billId}</p>
        </div>
      </div>
  );
};

export default BillItem;
