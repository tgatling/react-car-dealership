import React, { useState } from 'react';

import PaymentItem from '../payments/summary/PaymentItem';
import { calculatePaymentsFromOffer } from '../Calculations';
import styles from '../payments/summary/PaymentTable.module.css';
import PaymentSummary from '../payments/summary/PaymentSummary';

interface paymentTableProps {
  totalAmount: number;
  downPayment: number;
  numberOfPayments: number;
}

const OfferTable = ({
  totalAmount,
  downPayment,
  numberOfPayments,
}: paymentTableProps) => {
  const [viewFullTable, setViewFullTable] = useState(false);

  let { paymentCalculations } = calculatePaymentsFromOffer(
    totalAmount,
    downPayment,
    numberOfPayments
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

  return (
    <div className={styles.card}>
      <PaymentSummary
        onToggle={toggleViewTable}
        downPayment={downPayment}
        equalPayments={equalPayments}
        numberOfPayments={numberOfPayments}
        paymentCalculations={paymentCalculations}
        header={true}
      />
      {viewFullTable && (
        <div>
          {paymentCalculations.map((payment) => {
            return (
              <PaymentItem
                key={`payment-${payment.payment}`}
                payment={payment.payment}
                amount={payment.amount}
                status={payment.status}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OfferTable;
