import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import styles from './PaymentInfo.module.css';
import { HOME_PAGE } from '../../../models/constants';

interface infoProps {
  totalAmount: number;
  downPayment: number;
  numberOfPayments: number;
  onReturn?: (previewMode: boolean) => void;
}

const PaymentInfo = ({
  totalAmount,
  downPayment,
  numberOfPayments,
  onReturn,
}: infoProps) => {
  const history = useHistory();
  const params = useParams<{ carId: string }>();
  const todaysDate = new Date();
  console.log(todaysDate);
  // TODO: CALCULATE THE DATE THAT PAYMENTS WILL BE COMPLETED.

  const returnToOfferFormHandler = () => {
    if (onReturn) {
      onReturn(false);
    }
  };

  return (
    <div className={styles.infoContainer}>
      <div className={styles.buttonContainer}>
        <button onClick={returnToOfferFormHandler}>Return to Offer Form</button>
      </div>
      <p>{`Total Price: $${totalAmount}`}</p>
      <p>{`Down Payment Amount: $${downPayment}`}</p>
      <p>{`Amount Remaining After Down Payment: $${
        totalAmount - downPayment
      }`}</p>
      <p>{`Number of Monthly Payments: ${numberOfPayments}`}</p>
      <p>{`Your vehicle will be paid off by [date]`}</p>
    </div>
  );
};

export default PaymentInfo;
