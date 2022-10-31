import React, { useEffect, useState } from 'react';

import { Bill, Payment } from '../../models/payments';
import paymentService from '../../services/payment.service';
import styles from './BillBreakdown.module.css';

interface billBreakdownProp {
  bills: Bill[];
}

const BillBreakdown = ({ bills }: billBreakdownProp) => {
  let [paymentList, setPaymentList] = useState<Payment[] | []>([]);

  useEffect(() => {
    let loadedPayments: Payment[] = [];
    bills.forEach((bill) => {
      // let dueDate = bill.paymentDueDate;
      bill.paymentIds.forEach((payment) => {
        paymentService.getPayment(payment.paymentId).then((response) => {
          let payment = response;
          loadedPayments.push(payment);
        });
      });
    });
    setPaymentList(loadedPayments);
  }, [bills]);

  return (
    <div className={styles.table}>
      <div className={styles.row}>
        <div className={styles.columnHeader}>Due Date</div>
        <div className={styles.columnHeader}>Payment Date</div>
        <div className={styles.columnHeader}>Amount Paid</div>
        <div className={styles.columnHeader}>Confirmation No.</div>
      </div>
      {paymentList.map((paymentInfo) => {
        return (
          <div className={styles.row} key={paymentInfo.confirmationNumber}>
            <div>{test}</div>
            <div className={styles.paymentInfo}>{paymentInfo.paymentDate}</div>
            <div className={styles.paymentInfo}>
              $ {paymentInfo.paymentAmount}
            </div>
            <div className={styles.paymentInfo}>
              {paymentInfo.confirmationNumber}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BillBreakdown;
