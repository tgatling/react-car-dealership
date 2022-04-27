import React, { useState } from 'react';

import PaymentItem from './PaymentItem';
import { calculateRemainingPayments } from '../Calculations';
import styles from './PaymentTable.module.css';
import PaymentSummary from './PaymentSummary';
import {PaymentHistory} from '../../../models/payments';

interface paymentTableProps {
  payments: PaymentHistory;
  // carId: string;
  // userId: string;
  // totalAmount: number;
  // downPayment: number;
  // numberOfPayments: number;
  // paymentsMade: number;
}

const PaymentTable = ({payments}: paymentTableProps) => {
  const [viewFullTable, setViewFullTable] = useState(false);
  // let { paymentCalculations } = calculateRemainingPayments(payments);

  // let equalPayments: boolean;

  // if (paymentCalculations.length > 1) {
  //   equalPayments =
  //     paymentCalculations[0].amount === paymentCalculations[1].amount
  //       ? true
  //       : false;
  // } else {
  //   equalPayments = true;
  // }

  let equalPayments = false;
  let paymentCalculations = [{ payment: 0, amount: 0, status: 'PENDING' }];

  const toggleViewTable = () => {
    setViewFullTable(!viewFullTable);
  };

  return (
    <div className={styles.card}>
      <PaymentSummary
        onToggle={toggleViewTable}
        equalPayments={equalPayments}
        numberOfPayments={payments.numberOfMonthlyPayments}
        paymentCalculations={paymentCalculations}
        header={false}
      />
      {viewFullTable && (
        <div>
          {/* {paymentCalculations.map((payment) => {
            return (
              <PaymentItem
                key={`payment-${payment.payment}`}
                payment={payment.payment}
                amount={payment.amount}
                status={payment.status}
              />
            );
          })} */}
        </div>
      )}
    </div>
  );
};

export default PaymentTable;
