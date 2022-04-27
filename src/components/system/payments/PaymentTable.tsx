import React, { useEffect, useState } from 'react';

import { calculatePaymentsFromOffer } from '../Calculations';
import styles from './PaymentTable.module.css';
import PaymentSummary from './PaymentSummary';
import { PaymentHistory } from '../../../models/payments';
import {
  downPayment,
  firstBill,
  secondBill,
  thirdBill,
} from '../../../tests/mockData/mockPaymentHistory';
import PaymentItem from './PaymentItem';

const MONTHLY_BILLS = [downPayment, firstBill, secondBill, thirdBill];

interface paymentTableProps {
  payments: PaymentHistory;
}

const PaymentTable = ({ payments }: paymentTableProps) => {
  const [viewFullTable, setViewFullTable] = useState(false);
  const { totalCarPrice, downPayment, numberOfMonthlyPayments } = payments;

  let { paymentCalculations } = calculatePaymentsFromOffer(
    totalCarPrice,
    downPayment,
    numberOfMonthlyPayments
  );

  let equalPayments: boolean;

  if (paymentCalculations.length > 1) {
    equalPayments =
      paymentCalculations[0].amount === paymentCalculations[1].amount
        ? true
        : false;
  } else {
    equalPayments = true;
  }

  const toggleViewTable = () => {
    setViewFullTable(!viewFullTable);
  };

  let billStatus;

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
          {MONTHLY_BILLS.map((bill) => {
            billStatus = bill.paymentCompleted ? 'PAID' : 'PENDING';
            return (
              <PaymentItem
                key={`payment-${bill.billId}`}
                payment={bill.billNumber}
                amount={bill.amountDue}
                status={billStatus}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PaymentTable;
