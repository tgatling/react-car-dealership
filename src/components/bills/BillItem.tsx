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

  let billTitle =
    bill.billNumber === 0 ? 'DOWN PAYMENT' : `BILL NUMBER ${billNumber}`;

  return (
    <div className={styles.billContainer}>
      <div className={styles.billLeftContainer}>
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
        <div className={styles.billStatus}>
          {paymentCompleted && <p>PAID</p>}
          {!paymentCompleted && <button>PAY NOW</button>}
        </div>
      </div>
      <div className={styles.billRightContainer}>
        <div className={styles.billHeader}>
          <h2>{billTitle}</h2>
        </div>
        <div className={styles.billElement}>
          <div className={styles.billDetails}>
            <div className={styles.billRow}>
              <div className={styles.billRowElements}>
                <div className={styles.row}>
                  <label>{'Due Date: '}</label>
                  <p>{`00/00/0000`}</p>
                </div>
              </div>
              <div className={styles.billRowElements}>
                <div className={styles.row}>
                  <label>{'Amount Due: '}</label>
                  <p>{`$${bill.amountDue}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.billElement}>
          <div className={styles.billDetails}>
            <div className={styles.billRow}>
              <div className={styles.billRowElements}>
                <div className={styles.row}>
                  <label>{'Number of Bill Payments Made: '}</label>
                  <p>{bill.paymentIds.length}</p>
                </div>
              </div>
              <div className={styles.billRowElements}>
                <div className={styles.viewPaymentsButton}>
                  <button>VIEW PAYMENTS</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillItem;
