import React from 'react';
import { useHistory } from 'react-router-dom';

import checkMark from '../../images/payments/check-mark.png';
import checkbox from '../../images/payments/checkbox.png';
import styles from './BillDisplay.module.css';

import { Bill } from '../../models/payments';

interface billProp {
  bill: Bill;
}

/**
 * Bill Item Component
 * @param {Bill} bill individual bill containing one month's payment information
 * @returns Billing information and the option to view or make payments for that bill
 */

const BillItem = ({ bill }: billProp) => {
  const history = useHistory();
  const {
    billId,
    billNumber,
    paymentDueDate,
    amountDue,
    paymentCompleted,
    paymentIds,
  } = bill;

  let dueDate = new Date(paymentDueDate);
  let billTitle =
    bill.billNumber === 0 ? 'DOWN PAYMENT' : `BILL NUMBER ${billNumber}`;

  const viewPaymentsHandler = () => {
    console.log(`Clicked on View Payments for Bill Id: ${bill.billId}`);
  };
  
  const makePaymentHandler = () => {
    history.push(`/make-payment/${billId}`);
  };

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
          {!paymentCompleted && (
            <button onClick={makePaymentHandler}>PAY NOW</button>
          )}
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
                  <p>{`${
                    dueDate.getUTCMonth() + 1
                  }/${dueDate.getUTCDate()}/${dueDate.getUTCFullYear()}`}</p>
                </div>
              </div>
              <div className={styles.billRowElements}>
                <div className={styles.row}>
                  <label>{'Amount Due: '}</label>
                  <p>{`$${amountDue}`}</p>
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
                  <p>{paymentIds.length}</p>
                </div>
              </div>
              <div className={styles.billRowElements}>
                <div className={styles.viewPaymentsButton}>
                  <button onClick={viewPaymentsHandler}>VIEW PAYMENTS</button>
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
