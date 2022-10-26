import React, { useEffect } from 'react';

import { Bill, Payment } from '../../models/payments';
import styles from './BillBreakdown.module.css';

interface billBreakdownProp {
  bills: Bill[];
}

const DUMMY_DATA = [
  {
    paymentNumber: 1,
    dueDate: '',
    amountDue: 10000,
    amountPaid: 10000,
    paymentDate: '',
    confirmationNumber: 9374726027439572536,
  },
  {
    paymentNumber: 2,
    dueDate: '',
    amountDue: 10000,
    amountPaid: 10000,
    paymentDate: '',
    confirmationNumber: 9374726027439572536,
  },
];

const BillBreakdown = ({ bills }: billBreakdownProp) => {
  // let paymentList: {
  //   paymentNumber: number;
  //   dueDate: Date;
  //   amountDue: number;
  //   amountPaid: number;
  //   paymentDate: Date;
  //   confirmationNumber: number;
  // }[] = [];

  console.log(bills);

  useEffect(() => {
    // TODO: get payment and group data for display
  }, []);

  return (
    <div className={styles.table}>
      <div className={styles.row}>
        <div className={styles.columnHeader}>Payment No.</div>
        <div className={styles.columnHeader}>Due Date</div>
        <div className={styles.columnHeader}>Amount Due</div>
        <div className={styles.columnHeader}>Amount Paid</div>
        <div className={styles.columnHeader}>Payment Date</div>
        <div className={styles.columnHeader}>Confirmation No.</div>
      </div>
      {DUMMY_DATA.map((paymentInfo) => {
        return (
          <div className={styles.row} key={paymentInfo.confirmationNumber}>
            <div className={styles.paymentInfo}>{paymentInfo.paymentNumber}</div>
            <div className={styles.paymentInfo}>00/00/0000</div>
            <div className={styles.paymentInfo}>$ {paymentInfo.amountDue}</div>
            <div className={styles.paymentInfo}>$ {paymentInfo.amountPaid}</div>
            <div className={styles.paymentInfo}>00/00/0000</div>
            <div className={styles.paymentInfo}>{paymentInfo.confirmationNumber}</div>
          </div>
        );
      })}
    </div>
  );
};

export default BillBreakdown;
