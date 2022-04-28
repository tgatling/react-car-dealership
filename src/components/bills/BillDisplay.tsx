import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import billService from '../../services/bill.service';
import styles from './BillDisplay.module.css';

import { Bill } from '../../models/payments';
import { PAYMENT_HISTORY } from '../../models/constants';
import { useSelector, RootStateOrAny } from 'react-redux';

const BillDisplay = () => {
  const [userId, setUserId] = useState('');
  const [userBills, setUserBills] = useState<Bill[]>([]);

  const location = useLocation();

  const params = useParams<{ userId: string }>();

  const currentUser = useSelector(
    (state: RootStateOrAny) => state.user.currentUser
  );
  const currentUserId = JSON.parse(currentUser).userId;

  useEffect(() => {
    if (params.userId) {
      setUserId(params.userId);
    } else if (location.pathname === PAYMENT_HISTORY) {
      setUserId(currentUserId);
    }

    let loadedBills: Bill[] = [];

    billService
      .getAllBills()
      .then((response) => {
        for (const key in response) {
          if (response[key].userId === userId) {
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
        }

        setUserBills(loadedBills);
      })
      .catch((error) => error);
  }, [currentUserId, location.pathname, params.userId, userId]);

  return (
    <div className={styles.section}>
      <div>
        {userBills.map((bill) => {
          return (
            <div key={bill.billId}>
              <p>{`Bill Id: ${bill.billId}`}</p>
            </div>
          );
        })}
      </div>
      {userBills.length === 0 && (
        <div>
          <p>No Bills to Display</p>
        </div>
      )}
    </div>
  );
};

export default BillDisplay;
