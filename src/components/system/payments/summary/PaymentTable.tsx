import React, { useEffect, useState } from 'react';

import PaymentItem from './PaymentItem';
import PaymentSummary from './PaymentSummary';
import styles from './PaymentTable.module.css';

import { calculatePaymentsFromOffer } from '../../Calculations';
import { Offer } from '../../../../models/offer';
import {
  downPayment,
  firstBill,
  secondBill,
  thirdBill,
} from '../../../../tests/mockData/mockPaymentHistory';

const MONTHLY_BILLS = [downPayment, firstBill, secondBill, thirdBill];

interface paymentTableProps {
  offer: Offer;
}

const PaymentTable = ({ offer }: paymentTableProps) => {
  const [viewFullTable, setViewFullTable] = useState(false);
  const { carTotal, downPayment, numberOfPayments } = offer;

  useEffect(() => {
    // Get all bill related to this offer
  }, []);

  let { paymentCalculations } = calculatePaymentsFromOffer(
    carTotal,
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

  let billStatus;

  return (
    <div className={styles.card}>
      <PaymentSummary
        onToggle={toggleViewTable}
        downPayment={offer.downPayment}
        equalPayments={equalPayments}
        numberOfPayments={offer.numberOfPayments}
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
