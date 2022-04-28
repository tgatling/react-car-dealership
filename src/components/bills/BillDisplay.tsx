import React, { useEffect, useState } from 'react';

import billService from '../../services/bill.service';

import { Bill } from '../../models/payments';

import styles from './BillDisplay.module.css';
import { useParams } from 'react-router-dom';

const BillDisplay = () => {
  const [bills, setBills] = useState<Bill[]>([]);

  const params = useParams<{ userId: string }>();
  console.log(params.userId);

  useEffect(() => {
    let loadedBills: Bill[] = [];

    billService
      .getAllBills()
      .then((response) => {
        for (const key in response) {
          loadedBills.push({
            billId: key,
            offerId: response[key].offerId,
            userId: response[key].userId,
            billNumber: response[key].billNumber,
            paymentDueDate: response[key].paymentDueDate,
            amountDue: response[key].amountDue,
            paymentCompleted: response[key].paymentCompleted,
            paymentIds: response[key].paymentIds,
          });
        }
      })
      .catch((error) => error);
  });

  return (
    <div className={styles.section}>
      <div>
        <p>Bill Display</p>
      </div>
    </div>
  );
};

export default BillDisplay;
